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
                <form class="">
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
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
    <div>
        result
    </div>
</body>
<script src="js/visualize.js"></script>
</html>
