module.exports = function (RED) {
    function SonosNotifyNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var address = config.address;
        var port = config.port;
        var lastUri = '';
        var Sonos = require('sonos');

        if (!address || !port) {
            return;
        }

        var device = new Sonos.Sonos(address, port);

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