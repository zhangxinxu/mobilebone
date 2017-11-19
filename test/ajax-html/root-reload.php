<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>类似列表详情页的加载测试<?php echo $_GET['id']; ?></title>
</head>

<body>
<div class="page out pageRootReload" data-callback="root_reload" data-onpagefirstinto="page_root_first">
	<p>document.getElementById("idShow").innerHTML是：<strong id="idShow">&nbsp;</strong>，应该结果是<strong id="idShould"><?php echo $_GET['id']; ?></strong>.</p>
    <p><button id="ajaxFirstInto">pagefirstinto与Ajax载入测试</button></p>
	<ul>
        <li><a href="#pageHome" id="scriptTest<?php echo $_GET['id']; ?>" data-rel="back" data-ajax="true">返回</a></li>
        <li><a href="root-reload.php?id=8" data-ajax="true" data-reload>id不一样的页面</a></li>
    </ul>
    <script>
	document.getElementById("scriptTest<?php echo $_GET['id']; ?>").style.backgroundColor = "#" + (Math.random() + "").slice(-6);
	setTimeout(function() {		
		document.getElementById("idShow").parentNode.addEventListener("touchstart", function() {
			console.log("inline script should once!");
			document.getElementById("scriptTest").style.backgroundColor = "#" + (Math.random() + "").slice(-6);	
		});	
	}, 350);
	console.log("<?php echo $_GET['id']; ?>: script excuted!");
	</script>
    <script type="text/template">
	console.log("should not excute!");
	</script>
    <script src="../modular-load/1.js">console.log("should not excute when src script!");</script>
</div>
</body>
</html>
