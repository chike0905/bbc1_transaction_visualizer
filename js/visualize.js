function showtx(){
    $("#result")[0].innerHTML = "<svg><g/></svg>";

    asset_group_id = $("#assetgroupid")[0].value;
	tx_id = $("#tx_id")[0].value;
    user_id = $("#user_id")[0].value;

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
						.setGraph({ rankdir: "LR" });
    var counter = 0;
	var txcounterid = 0
    var labels = {};
    result.forEach(function(tx){
        g.setNode(counter,  {label: "Transaction", clusterLabelPos:"top", style: "stroke: #333; fill: #7f7;"})
        txcounterid = counter;
        counter++;
        returns = draw_result(g, counter, tx, txcounterid);
        labels[tx["transaction_id"]] = returns[0];
        counter = returns[1];
    });

    result.forEach(function(tx){
        if(tx["Reference"].length != 0){
            for(refindex in tx["Reference"]){
                target = labels[tx["Reference"][refindex]["transaction_id"]]["Event"][tx["Reference"][refindex]["event_index_in_ref"]]["Asset"]["asset_id"];
                source = labels[tx["transaction_id"]]["Reference"][refindex]["transaction_id"];
                g.setEdge(target, source,  { label: "", arrowhead: "normal", lineInterpolate: "bundle", lineTension: 100, style: "" });
            }
        }
    });


	var render = new dagreD3.render();
	var svg = d3.select("svg");
	render(d3.select("svg g"), g);

	svg.attr("height", g.graph().height);
	svg.attr("width", g.graph().width);
}

function draw_result(g, counter, result, parentid){
    var locallabels = {};
    var tmpkeystuck = [];
	for(key in result){
        type = Object.prototype.toString.call(result[key]);
		if(type === "[object Array]" || type === "[object Object]"){
            locallabels[key] = {id: counter};
            g.setNode(counter,  {label: key, clusterLabelPos:"top", style: "stroke: #333; fill: #fff;"})
			g.setParent(counter, parentid);
			parent = counter
			counter++;
            tmpkeystuck.push(key);
            returns = draw_result(g, counter, result[key], parent);
            locallabels[tmpkeystuck[tmpkeystuck.length - 1]] = Object.assign(locallabels[tmpkeystuck[tmpkeystuck.length - 1]] , returns[0]);
            counter = returns[1];
		} else {
			if(result[key].length > 40){
				printvalue = result[key].substr(0, 40)+"..."
			}
            locallabels[key] = counter;
			g.setNode(counter,  {label: key+"\n"+printvalue});
			g.setParent(counter, parentid);
			counter++;
		}
	}
	return [locallabels, counter]
}
