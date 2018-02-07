function showtx(){
    $("#result")[0].innerHTML = "<svg><g/></svg>";
	asset_group_id = $("#assetgroupid")[0].value;
	tx_id = $("#tx_id")[0].value;
    user_id = $("#user_id")[0].value;
	post(asset_group_id, tx_id, user_id).done(function(data){
        draw(data.result);
	}).fail(function(result){
        $("#result")[0].innerHTML = result.statusText;
    });
}

function post(asset_group_id, tx_id, user_id){
    var postdata = {
            "jsonrpc": "2.0",
            "method": "bbc1_GetTransaction",
            "params":{
                "asset_group_id":asset_group_id,
                "tx_id": tx_id,
                "user_id": user_id
            },
            "id": 5000
        }

    return $.ajax({
        type : "post",
        url : 'http://localhost:9000',
        dataType : "json",
        data: JSON.stringify(postdata),
	});
}

function draw(result){
	// label(ノード内の文字)をもつグラフを作成
	var g = new dagreD3.graphlib.Graph({ compound: true })
						.setGraph({ rankdir: "LR" })
						.setDefaultEdgeLabel(function() { return {}; });

	g.setNode(0,  {label: "Transaction", clusterLabelPos:"top", style: "stroke: #333; fill: #7f7;"})

	draw_result(g, 1, result, 0);

	// renderという関数を用意している。これが最終的に図を生成する関数
	var render = new dagreD3.render();

	// d3.select("svg");により，htmlにあるsvg要素が選択される。svgが複数ある場合は注意。その場合，svgの親要素をselectして，それにsvgをappendすればよい
	var svg = d3.select("svg");

	// svgの子要素gの部分に，グラフgをレンダー
	render(d3.select("svg g"), g);

	// svgのサイズがデフォルトのままでは見切れてしまうので大きさを調整
	svg.attr("height", g.graph().height);
	svg.attr("width", g.graph().width);
}

function draw_result(g, counter, result, parentid){
	for(key in result){
		type = Object.prototype.toString.call(result[key]);
		if(type === "[object Array]" || type === "[object Object]"){
			g.setNode(counter,  {label: key, clusterLabelPos:"top", style: "stroke: #333; fill: #fff;"})
			g.setParent(counter, parentid);
			parent = counter
			counter++;
			counter = draw_result(g, counter, result[key], parent)
		} else {
			if(result[key].length > 40){
				result[key] = result[key].substr(0, 40)+"..."
			}
			g.setNode(counter,  {label: key+"\n"+result[key]});
			g.setParent(counter, parentid);
			counter++;
		}
	}
	return counter
}
