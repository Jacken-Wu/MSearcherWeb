# MSearcherWeb

## 介绍

[MSearcher](https://github.com/Jacken-Wu/MSearcher) 的网页版本。

只保留了搜索和下载功能，其他功能均已移除。

`html/memes/` 目录下存放meme图/表情包。

## 运行

1. 服务器安装 apache2，部署 http 服务；
2. 修改 `server/http_api_server.py` 中的端口，修改 `html/js/electronAPI.js` 中的地址和端口；
3. python3 运行 `server/http_api_server.py` 服务端。
