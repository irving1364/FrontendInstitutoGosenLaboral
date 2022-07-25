(function ()
{
    'use strict';

    angular
        .module('coinex-app.directives')
        .controller('CustomThemeDialogControllerNew', CustomThemeDialogControllerNew);

    /** @ngInject */
    function CustomThemeDialogControllerNew(fuseTheming, $mdDialog, fuseGenerator, $cookies, $window)
    {


        // Data
        var vm = this;
        vm.palettes = fuseTheming.getRegisteredPalettes();
        vm.themes = fuseTheming.getRegisteredThemes();

        // Delete Unnecessary hue value
        delete vm.palettes.grey['1000'];

        // Methods
        vm.rgba = fuseGenerator.rgba;
        vm.setTheme = setTheme;
        vm.setThemeColorido = setThemeColorido;
        vm.setThemeGris = setThemeGris;
        vm.setThemeDark = setThemeDark;
        vm.closeDialog = closeDialog;



        // If custom theme exist keep using it otherwise set default as a custom
        if ( !vm.themes.custom )
        {
            vm.theme = angular.copy(vm.themes['default'].colors);
        }
        else
        {
            vm.theme = vm.themes.custom.colors;
        }

        /**
         * Put custom theme into the cookies
         * and reload for generate styles
         */

         

        function setThemeColorido()
        {
         
            var theme = {};
            theme = {"primary":{"name":"fuse-paleblue","hues":{"default":"900","hue-1":"500","hue-2":"600","hue-3":"400"}},"accent":{"name":"amber","hues":{"default":"50","hue-1":"A200","hue-2":"800","hue-3":"A200"}},"warn":{"name":"orange","hues":{"default":"500","hue-1":"300","hue-2":"800","hue-3":"A100"}},"background":{"name":"grey","hues":{"default":"A100","hue-1":"A100","hue-2":"A100","hue-3":"A100"}}};
            $cookies.putObject('customTheme', theme);
            $cookies.put('selectedTheme', 'custom');
            $window.location.reload();
            //$state.reload();
        }

        function setThemeDark()
        {
            console.log('asd');
            var theme = {};
            //theme ="CUSTOM_THEME_NAME" : {"primary":{"name":"grey","hues":{"default":"300","hue-1":"500","hue-2":"600","hue-3":"400"}},"accent":{"name":"fuse-paleblue","hues":{"default":"900","hue-1":"300","hue-2":"300","hue-3":"A100"}},"warn":{"name":"grey","hues":{"default":"500","hue-1":"300","hue-2":"800","hue-3":"A100"}},"background":{"name":"grey","hues":{"default":"50","hue-1":"50","hue-2":"50","hue-3":"50"}}}
           
           theme = {"primary":{"name":"grey","hues":{"default":"A200","hue-1":"500","hue-2":"600","hue-3":"400"}},"accent":{"name":"grey","hues":{"default":"A100","hue-1":"A200","hue-2":"A200","hue-3":"A200"}},"warn":{"name":"grey","hues":{"default":"500","hue-1":"300","hue-2":"800","hue-3":"A100"}},"background":{"name":"grey","hues":{"default":"900","hue-1":"900","hue-2":"900","hue-3":"900"}}}

            $cookies.putObject('customTheme', theme);
            $cookies.put('selectedTheme', 'custom');
            $window.location.reload();
            //$state.reload();
        }


        function setThemeGris()
        {
            console.log('asd');
            var theme = {};
            //theme ="CUSTOM_THEME_NAME" : {"primary":{"name":"grey","hues":{"default":"300","hue-1":"500","hue-2":"600","hue-3":"400"}},"accent":{"name":"fuse-paleblue","hues":{"default":"900","hue-1":"300","hue-2":"300","hue-3":"A100"}},"warn":{"name":"grey","hues":{"default":"500","hue-1":"300","hue-2":"800","hue-3":"A100"}},"background":{"name":"grey","hues":{"default":"50","hue-1":"50","hue-2":"50","hue-3":"50"}}}
           
           theme = {"primary":{"name":"grey","hues":{"default":"300","hue-1":"500","hue-2":"600","hue-3":"400"}},"accent":{"name":"grey","hues":{"default":"900","hue-1":"50","hue-2":"50","hue-3":"50"}},"warn":{"name":"grey","hues":{"default":"500","hue-1":"300","hue-2":"800","hue-3":"A100"}},"background":{"name":"grey","hues":{"default":"50","hue-1":"50","hue-2":"50","hue-3":"50"}}};

            $cookies.putObject('customTheme', theme);
            $cookies.put('selectedTheme', 'custom');
            $window.location.reload();
            //$state.reload();
        }


        

        function setTheme()
        {
            $cookies.putObject('customTheme', vm.theme);
            $cookies.put('selectedTheme', 'custom');
            $window.location.reload();
            //$state.reload();
        }

        /**
         * Close dialog
         */
        function closeDialog()
        {
            $mdDialog.hide();
        }
    }
})();