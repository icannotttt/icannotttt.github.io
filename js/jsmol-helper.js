// JSmol 助手函数 - 封装自你可运行的代码
function initJSmol(containerId, cifPath, options) {
    // 参数处理
    var appletName = (options && options.appletName) || containerId + '_app';
    var customScript = (options && options.script) || null;
    
    function initFullJSmol() {
        if (!window.Jmol) {
            setTimeout(initFullJSmol, 100);
            return;
        }
        
        var container = document.getElementById(containerId);
        if (!container) {
            console.error('JSmol 容器未找到:', containerId);
            return;
        }
        
        try {
            // 完整的 JSmol 配置 :cite[7]
            var defaultScript = "set antialiasDisplay true; spacefill 0.4; wireframe 0.1; color atoms cpk; background white;";
            var fullScript = "load " + cifPath + "; " + (customScript || defaultScript);
            
            var Info = {
                width: container.clientWidth,
                height: 400,
                color: "0xFFFFFF",
                addSelectionOptions: false,
                use: "HTML5",
                j2sPath: "/Jmol-16.3.33-binary/jmol-16.3.33/jsmol/jsmol/j2s",
                script: fullScript,
                readyFunction: function(applet) {
                    console.log('JSmol 应用准备就绪:', containerId);
                    container.style.border = '2px solid green';
                    if (options && options.onReady) options.onReady(applet);
                },
                errorFunction: function(applet, error) {
                    console.error('JSmol 错误:', error);
                    container.innerHTML = '<p style="color: red;">JSmol 错误: ' + error + '</p>';
                    if (options && options.onError) options.onError(error);
                }
            };
            
            // 生成 HTML 并插入 :cite[7]
            var jmolHtml = Jmol.getAppletHtml(appletName, Info);
            container.innerHTML = jmolHtml;
            
            console.log('JSmol HTML 已生成:', containerId);
            
        } catch(e) {
            console.error('完整配置错误:', e);
            container.innerHTML = '<p style="color: red;">错误: ' + e.toString() + '</p>';
        }
    }

    // 动态加载 JSmol
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
}

// 使函数在全局可用
window.initJSmol = initJSmol;
console.log('JSmol 助手函数加载完成');