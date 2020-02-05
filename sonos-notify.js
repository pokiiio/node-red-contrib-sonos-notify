module.exports = function (RED) {
    var Sonos = require('sonos');

    function SonosNotifyNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var address = config.address;
        var port = config.port;

        if (!address || !port) {
            Sonos.DeviceDiscovery().once('DeviceAvailable', device => {
                device.getAllGroups()
                    .then(groups => {
                        groups.forEach(group => {
                            registerListener(node, group.host, group.port);
                        })
                    })
            })
        } else {
            registerListener(node, address, port);
        }
    }

    function registerListener(node, address, port) {
        var device = new Sonos.Sonos(address, port);
        var lastUri = '';

        device.on('CurrentTrack', (track) => {
            if (!track || track.uri == lastUri) {
                return;
            }

            lastUri = track.uri;

            var msg = {};
            msg.event = 'CurrentTrack';
            msg.address = address;
            msg.payload = track;
            node.send(msg);
        })
    }

    RED.nodes.registerType("sonos-notify", SonosNotifyNode);
}