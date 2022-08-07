(function(concept){
    'use strict';
    
    function object_array_sort(data, key, order,fn) {
        //デフォは降順(DESC)
        var num_a = -1;
        var num_b = 1;

        if (order === 'asc') {//指定があれば昇順(ASC)
            num_a = 1;
            num_b = -1;
        }

        data = data.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            if (x > y) return num_a;
            if (x < y) return num_b;
            return 0;
        });

        fn(data); // ソート後の配列を返す
    }

    concept.updateList = function(data){

        object_array_sort(data, 'id', 'asc', function (new_data) {
            //ソート後の処理
            data = new_data;
        });

        d3.select('#names').remove();//初期化     

       var rows = d3.select('#concept-list ul').append("g").attr('id', 'names') //リスト表示
	    .selectAll('li')
	    .data(data)
        .enter()
        .append('li')
        

        
       rows.append('a')
           .text(function (d) { return d.id; })
           .attr('id', 'mozi')
           .on('click.map', drowmap) //地図の描画
            //.on('click.image', drowimage)
           .on('click.tweet', drowtweet)
	       .on('click.log', function(d){
	 	        console.log('You clicked ' + JSON.stringify(d));
               })
            //.on('click.text', drowtext)
           //.on('click.text', drowwords)
           .on('click.color', function(){
                d3.selectAll('#mozi').style("color", "royalblue");
                d3.select(this).style("color", "red");
           })

    };
}(window.concept = window.concept || {}));
