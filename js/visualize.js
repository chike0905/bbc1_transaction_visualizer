function showtx(){
    $("#result")[0].innerHTML = "<svg><g/></svg>";

    asset_group_id = "994db1b032803b760e40a6094856ad2411f5f134e9e08fb5ebb968e6442098b5";
    tx_id = "7599c8dc204b94c96dad9880f56e98e4d0efb6d5d487538a8a3216699f2ae1a8";
    //tx_id = "61c9e3c536c0ff4901ea955e187c00d3c05604d8c8d46112ded50a190a859410";
    user_id = "112b08d6d7d7cfa1544f12263187b895c1676d9be8282d0f743b89cdfd69fb5a66";
    /*
	asset_group_id = $("#assetgroupid")[0].value;
	tx_id = $("#tx_id")[0].value;
    user_id = $("#user_id")[0].value;
    */
    post(asset_group_id, tx_id, user_id).done(function(result){
        console.log(result);
        draw(result);
	}).fail(function(result){
        console.log(result);
        $("#result")[0].innerHTML = result.statusText;
    });
}

function post(asset_group_id, tx_id, user_id){
    var postdata = {
                "asset_group_id":asset_group_id,
                "tx_id": tx_id,
                "user_id": user_id
                };

    return $.ajax({
        type : "post",
        url : './post.php',
        dataType : "json",
        data: JSON.stringify(postdata),
	});
}

function draw(result){
	// label(ノード内の文字)をもつグラフを作成
	var g = new dagreD3.graphlib.Graph({ compound: true })
						.setGraph({ rankdir: "LR" })
						.setDefaultEdgeLabel(function() { return {}; });
    var counter = 0;
	var txcounterid = 0
    result.forEach(function(tx){
        g.setNode(counter,  {label: "Transaction", clusterLabelPos:"top", style: "stroke: #333; fill: #7f7;"})
        txcounterid = counter;
        console.log(txcounterid);
        counter++;
        counter = draw_result(g, counter, tx, txcounterid);
    });
    //g.setEdge(0, 33);

	var render = new dagreD3.render();
	var svg = d3.select("svg");
	render(d3.select("svg g"), g);

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
