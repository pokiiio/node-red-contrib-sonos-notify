module.exports = function (RED) {
    function SonosNotifyNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var address = config.address;
        var port = config.port;
        var Sonos = require('sonos');

        if (!address || !port) {
            Sonos.DeviceDiscovery((device) => {
                address = device.host;
                port = device.port;
                registerListener(node, address, port);
            })
        }

        registerListener(node, address, port);
    }

    function registerListener(node, address, port) {
        var device = new Sonos.Sonos(address, port);
        var lastUri = '';

        device.on('CurrentTrack', (track) => {
            if (!track || track.uri === lastUri) {
                return;
            }

            lastUri = track.uri;

            var msg = {};
            msg.event = 'CurrentTrack';
            msg.payload = track;
            node.send(msg);
        })
    }

    RED.nodes.registerType("sonos-notify", SonosNotifyNode);
}