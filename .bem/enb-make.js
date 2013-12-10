module.exports = function(config) {
    config.mode('development', function() {
        config.node('bundles/index', function(nodeConfig) {
            nodeConfig.addTechs([
                [ require('enb/techs/file-copy'), { sourceTarget: '?.js', destTarget: '_?.js' } ],
                [ require('enb/techs/file-copy'), { sourceTarget: '?.css', destTarget: '_?.css' } ]
            ]);
        });
    });
    config.mode('production', function() {
        config.node('bundles/index', function(nodeConfig) {
            nodeConfig.addTechs([
                [ require('enb/techs/borschik'), { sourceTarget: '?.js', destTarget: '_?.js', minify: true, freeze: false } ],
                [ require('enb/techs/borschik'), { sourceTarget: '?.css', destTarget: '_?.css', minify: true, freeze: false } ]
            ]);
        });
    });

    config.node('bundles/index', function(nodeConfig) {
        nodeConfig.addTechs([
            [ require('enb/techs/levels'), { levels: getLevels() } ],
            [ require('enb/techs/file-provider'), { target: '?.bemjson.js' } ],
            require('enb/techs/bemdecl-from-bemjson'),
            require('enb/techs/deps-old'),
            require('enb/techs/files'),
            require('./enb-techs/bemjst'),
            require('./enb-techs/html-from-bemjson'),
            require('enb/techs/js'),
            require('enb/techs/css')
        ]);
        nodeConfig.addTargets(['?.html', '_?.js', '_?.css']);

        function getLevels() {
            return [
                { path: 'blocks', check: true }
            ].map(function(l) { return config.resolvePath(l); });
        }
    });
}