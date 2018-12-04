
/*
** Author: Nguyen Huu Thanh
** Home: https://www.facebook.com/huu.thanh.2509
** https://developers.facebook.com/tools/explorer/?method=GET&path=me%2Fposts%3Ffields%3Did%2Cname%2Cdescription&version=v3.2&classic=1
*/
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var http = new XMLHttpRequest;
var data = new FormData();
data.append('fb_dtsg', fb_dtsg);
data.append('app_id', '165907476854626');
data.append('redirect_uri', 'fbconnect://success');
data.append('display', 'popup');
data.append('access_token', '');
data.append('sdk', '');
data.append('from_post', '1');
data.append('private', '');
data.append('tos', '');
data.append('login', '');
data.append('read', '');
data.append('write', '');
data.append('extended', '');
data.append('social_confirm', '');
data.append('confirm', '');
data.append('seen_scopes', '');
data.append('auth_type', '');
data.append('auth_token', '');
data.append('default_audience', '');
data.append('ref', 'Default');
data.append('return_format', 'access_token');
data.append('domain', '');
data.append('sso_device', 'ios');
data.append('__CONFIRM__', '1');
http.open('POST', 'https://www.facebook.com/v1.0/dialog/oauth/confirm');
http.send(data);
http.onreadystatechange = function () {
	if (http.readyState == 4 && http.status == 200) {
		var http2 = new XMLHttpRequest;
		http2.open('GET', 'https://b-api.facebook.com/restserver.php?method=auth.getSessionForApp&format=json&access_token=' + http.responseText.match(/access_token=(.*?)&/)[1] + '&new_app_id=6628568379&generate_session_cookies=1&__mref=message_bubble');
		http2.send();
		http2.onreadystatechange = function () {
			if (http2.readyState == 4 && http2.status == 200) {
				var http3 = new XMLHttpRequest()
				var token = JSON.parse(http2.responseText).access_token;
				http3.open('GET', 'https://graph.facebook.com/me/posts?fields=id&limit=9999&access_token=' + token);
				http3.send();
				http3.onreadystatechange = function () {
					if (http3.readyState == 4 && http3.status == 200) {
						graphData = JSON.parse(http3.responseText);
						console.log(graphData)
						// graphData.data.forEach((pdata) => {
						var http4 = new XMLHttpRequest;
						var pdata = { id: '100004966144394_1071360433039485' }
						http4.open('DELETE', 'https://graph.facebook.com/v3.2/' + pdata.id + '?access_token=' + token);
						http4.send();
						http4.onreadystatechange = function () {
							if (http4.readyState == 4 && http4.status == 200) {
								console.log('Deleted ' + pdata.id + '.');
							} else {
								console.log('Failed to delete ' + pdata.id);
							}
						}
						// })
					}
				}
			}
		}
	}
}
