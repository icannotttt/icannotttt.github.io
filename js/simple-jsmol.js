// simple-jsmol.js - 最简单版本
window.simpleJSmol = function(containerId, cifPath) {
    // 使用你原来能工作的代码，直接内联
    function initFullJSmol() {
        if (!window.Jmol) {
            setTimeout(initFullJSmol, 100);
            return;
        }
        
        var container = document.getElementById(containerId);
        if (!container) return;
        
        try {
            var Info = {
                width: container.clientWidth,
                height: 400,
                color: "0xFFFFFF",
                addSelectionOptions: false,
                use: "HTML5",
                j2sPath: "/Jmol-16.3.33-binary/jmol-16.3.33/jsmol/jsmol/j2s",
                script: "set antialiasDisplay true; load " + cifPath + "; spacefill 0.4; wireframe 0.1; color atoms cpk; background white;",
                readyFunction: function(applet) {
                    console.log('JSmol应用准备就绪');
                    container.style.border = '2px solid green';
                },
                errorFunction: function(applet, error) {
                    console.error('JSmol错误:', error);
                    container.innerHTML = '<p style="color: red;">JSmol错误: ' + error + '</p>';
                }
            };
            
            var jmolHtml = Jmol.getAppletHtml(containerId + '_app', Info);
            container.innerHTML = jmolHtml;
            
        } catch(e) {
            console.error('完整配置错误:', e);
            container.innerHTML = '<p>错误: ' + e.toString() + '</p>';
        }
    }

    if (!window.Jmol) {
        var script = document.createElement('script');
        script.src = '/Jmol-16.3.33-binary/jmol-16.3.33/jsmol/jsmol/JSmol.min.js';
        script.onload = function() {
            setTimeout(initFullJSmol, 1000);
        };
        document.head.appendChild(script);
    } else {
        initFullJSmol();
    }
};