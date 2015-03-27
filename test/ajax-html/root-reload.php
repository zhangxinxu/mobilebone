<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>根地址无缓存加载测试<?php echo $_GET['id']; ?></title>
</head>

<body>
<div class="page out" data-callback="root_reload" data-onpagefirstinto="page_root_first">
	<p>document.getElementById("idShow").innerHTML是：<strong id="idShow">&nbsp;</strong>，应该结果是<strong id="idShould"><?php echo $_GET['id']; ?></strong>.</p>
	<ul>
        <li><a href="#pageHome" data-rel="back">返回</a></li>
    </ul>
</div>
</body>
</html>
