'use strict';

const Utils = require('../utils');
const constants = require('../constants');
const osc = require('node-osc');

module.exports = class Osc {
    
    constructor () {
        this.config={
            'bci:fft': [
                {
                    ip: '127.0.0.1',
                    port: 6448,
                    key: '/wek/inputs',
                    info: 'fft.spectrum.1 -> wekinator',
                    transform: [ transforms.fftSpectrum, {channel: 1} ]
                },
                {
                    ip: '192.168.1.11',
                    port: 8000,
                    key: '/wek/inputs',
                    info: 'bands -> ableton remote',
                    transform: [ transforms.fftBands, {channel:1} ]
                },
                {
                    ip: '127.0.0.1',
                    port: 8000,
                    key: '/wek/inputs',
                    info: 'bands -> ableton local',
                    transform: [ transforms.fftBands, {channel:1} ]
                }                
            ]
        }
    }
    
    setup() {
        console.log("OSC setup")
        for (let source in this.config) {
            const targets = this.config[source]
            for (let target of targets) {
                //this.targetInfo(target)
                target.client = new osc.Client(target.ip, target.port); //send
            }
        }
    }

    targetInfo(target) {
        const info = `  ${target.info}: ${target.ip}:${target.port}, ${target.key} [${target.length}]`
        console.log(info)
    }

    emit(signal, data) {
        const targets = this.config[signal]
        if (!targets) return;

        // console.log(data);
        // exit()

        for (let target of targets) {
            let outData = target.transform ? target.transform[0](data, target.transform[1]) : data
            // outData.unshift(target.key)
            if (!target.length) {
                target.length = outData.length
                this.targetInfo(target)
            }
            target.client.send(target.key, outData, function () {});
        }
    }
}

const transforms = {
    fftSpectrum(data, options={channel:1}) {
        const out = data.data[options.channel-1]
        // console.log(out)
        return out
    },
    fftBands(data, options={channel:1}) {
        const out = [
            data.delta[0][options.channel-1],
            data.theta[0][options.channel-1],
            data.alpha[0][options.channel-1],
            data.beta[0][options.channel-1],
            data.gamma[0][options.channel-1],
        ]
        return out
    }    
}