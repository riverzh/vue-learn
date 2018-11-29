#这是一个尝试

##我猜应该没有人看吧，哈哈

###用心感受代码的诗情画意

####OK，就这样

##传统的命令行方式提交到码云
## git add .
## git commit -m"提交信息"
## git push 

##  底部导航栏用mui 需要注意的是
###  如果引入样式不能显示，看该样式在原来的地方是否还引入了其他的样式文件，
###  其他的样式文件是否又引入了其他的样式文件，要都引人进来才不会报错
###  Module not found: Error: Can't resolve '../fonts/mui-icons-extra.ttf' in 
###  'F:\mywork2\vue基础\day08\vue-cms1\src\lib\mui\css'
###  引入icons-extra.css会报错，根据错误信息，在当前这个css上一层有个ttf文件还需引入

##  vue-router 设置路由并点击的时候高亮显示
##  怎么回事？这个vscode我也是服了，为什么我设置好了以后半天运行的时候，点击路由的
##  router-link标签，url地址没有变化，我还以为哪里有错误，找啊找，结果过了好久，
##  自己就好使了。这是怎么回事，就问，啊啊啊啊啊