<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>根地址无缓存加载测试<?php echo $_GET['id']; ?></title>
</head>

<body>
<div class="page out" data-callback="root_reload" data-onpagefirstinto="page_root_first">
	<p>document.getElementById("idShow").innerHTML是：<strong id="idShow">&nbsp;</strong>，应该结果是<strong id="idShould"><?php echo $_GET['id']; ?></strong>.</p>
	<ul>
        <li><a href="#pageHome" id="scriptTest" data-rel="back">返回</a></li>
    </ul>
    <script>
	document.getElementById("scriptTest").style.backgroundColor = "#" + (Math.random() + "").slice(-6);
	console.log("script excuted!");
	</script>
    <script type="text/template">
	console.log("should not excute!");
	</script>
    <script src="../modular-load/1.js">console.log("should not excute when src script!");</script>
</div>
</body>
</html>
