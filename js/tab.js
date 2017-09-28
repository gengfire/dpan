chrome.tabs.create({
  url: 'https://pan.baidu.com/disk/home?#list/path=%2F&vmode=list'
}, function(e){
  console.log(e);
});