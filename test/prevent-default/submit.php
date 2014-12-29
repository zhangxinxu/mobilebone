<?php
	if (isset($_POST['username']) == false || isset($_POST['tel']) == false) {
		header('Location: index.html', true);
	}

	$username = $_POST['username'];
	$tel = $_POST['tel'];

	echo '<div class="p10">
		<p>提交的用户名是：'. $username .'</p>
		<p>提交的手机号是：'. $tel .'</p>
	</div>
	<ul><li><a href="index.html" data-ajax="false">刷新至初始态</a></li></ul>';
?>