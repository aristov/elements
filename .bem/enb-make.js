module.exports = function(config) {
    config.node('bundles/index', function(nodeConfig) {
        nodeConfig.addTechs([
            [ require('enb/techs/levels'), { levels: getLevels() } ],
            [ require('enb/techs/file-provider'), { target: '?.bemjson.js' } ],
            require('enb/techs/bemdecl-from-bemjson'),
            require('enb/techs/deps-old'),
            require('enb/techs/files'),
            require('./enb-techs/bemjst'),
            require('./enb-techs/html-from-bemjson'),
            [ require('enb/techs/browser-js'), { target: '?.js' } ],
            require('enb/techs/css'),

            [ require('enb/techs/file-copy'), { sourceTarget: '?.js', destTarget: '_?.js' } ],
            [ require('enb/techs/file-copy'), { sourceTarget: '?.css', destTarget: '_?.css' } ]
        ]);
        nodeConfig.addTargets(['?.html', '_?.js', '_?.css']);

        function getLevels() {
            return [
                { path: 'libs/bem-core/common.blocks', check: false },
                { path: 'libs/bem-core/desktop.blocks', check: false },
                { path: 'blocks', check: true }
            ].map(function(l) { return config.resolvePath(l); });
        }
    });
}