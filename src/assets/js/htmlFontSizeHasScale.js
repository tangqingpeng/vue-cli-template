function setHtmlFontSize(baseFontSize) {
        
    const _baseFontSize = baseFontSize || 75;//设计htmlfotnszie
    const ua = navigator.userAgent;
    const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    let dpr = window.devicePixelRatio || 1;
    if (!isIos && !(matches && matches[1] > 534)) {
        // 如果非iOS, 非Android4.3以上, dpr设为1;
        dpr = 1;
    }
    const scale = 1 / dpr;//设备像素比
    let metaEl = document.querySelector('meta[name="viewport"]');
    if (!metaEl) {
        metaEl = document.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        window.document.head.appendChild(metaEl);
    }
    metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);

    let clientWidth = document.documentElement.clientWidth;
    // if(clientWidth>1250){
    //     document.documentElement.style.width = 750+'px';
    //     document.documentElement.style.margin = '0 auto';
    //     clientWidth = 750;
    // }
    let fontSize =clientWidth / (750 / _baseFontSize);
    document.documentElement.style.fontSize =fontSize + 'px';
};
setHtmlFontSize();
window.onresize = function(){
    setHtmlFontSize();
}
