<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!--
    <link rel="stylesheet" href="vendor/twbs/bootstrap/dist/css/bootstrap.css" media="all">
    <script src="vendor/components/jquery/jquery.js"></script>
    <script src="vendor/twbs/bootstrap/dist/js/bootstrap.js"></script>
    -->
    <!-- for debug -->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

    <script src="https://d3js.org/d3.v4.js"></script>
    <script src="https://dagrejs.github.io/project/graphlib-dot/v0.6.3/graphlib-dot.js"></script>
    <script src="js/dagre-d3.js"></script>
    <script src="js/visualize.js"></script>
    <style>
    text {
        font-weight: 300;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serf;
        font-size: 14px;
    }

    .node rect {
        stroke: #999;
        fill: #fff;
        stroke-width: 1px; // edgeの先の▲の大きさです
    }

    .edgePath path {
        stroke: #333;
        stroke-width: 1px; // pathの太さです
    }
    </style>
    <title>BBc1 Trasaction Visualise</title>
</head>
<body class="containaer">
    <nav class="navbar navbar-default bg-faded">
        <a class="navbar-brand">BBc1 Trasaction Visualise</a>
    </nav>
    <div class="panel panel-default">
        <div class="panel-body">
            <h2>
                Hello BBc1 Trasaction Visualiser!
            </h2>
            <div>
                <form>
                    <div class="form-group">
                        <label for="assetgroupid">Asset Group ID</label>
                        <input type="text" class="form-control" id="assetgroupid" placeholder="Asset Group ID">
                    </div>
                    <div class="form-group">
                        <label for="tx_id">Tarnsaction ID</label>
                        <input type="text" class="form-control" id="tx_id" placeholder="Transaction ID">
                    </div>
                    <div class="form-group">
                        <label for="tx_id">User ID</label>
                        <input type="text" class="form-control" id="user_id" placeholder="User ID">
                    </div>
                    <input type="button" class="btn btn-primary" onclick="showtx()" value="Submit">
                </form>
            </div>
        </div>
    </div>
    <div id="result" class="text-center">
        <svg>
            <g></g>
        </svg>
    </div>
</body>
</html>
