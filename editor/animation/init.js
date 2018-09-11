//Dont change it
//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function wildDogsCanvas(dom, dogs, tgt_dogs) {

            if (!tgt_dogs)
                return;

            function differense(ary1, ary2) {
                let difs = [];
                ary1.forEach(a1=>{
                    let f = true;
                    for (let i=0; i < ary2.length; i += 1) {
                        if (a1[0] === ary2[i][0] && a1[1] === ary2[i][1]) {
                            f = false;
                            break;
                        }
                    }
                    if (f)
                        difs.push(a1);
                });
                return difs;
            }

            function fire_coordinate(tgt_dogs_coords) {

                let max_dist = 0;
                let min_dist = 9999;
                let max_coord = [];
                let min_coord = [];
                tgt_dogs_coords.forEach(c=>{
                    const dist = Math.sqrt(c[0]**2 + c[1]**2);
                    if (dist > max_dist) {
                        max_dist = dist;
                        max_coord = c;
                    }
                    if (dist < min_dist) {
                        min_dist = dist;
                        min_coord = c;
                    }
                });

                const slope = (max_coord[1] - min_coord[1])
                                / (max_coord[0] - min_coord[0]);
                const itc_y = max_coord[1] - max_coord[0]*slope;
                const itc_x = max_coord[0] - max_coord[1]/slope;

                if (itc_y === 0)
                    return [0, 0, max_coord[0], max_coord[1]];

                const answer = (Math.abs(itc_y) * Math.abs(itc_x))
                                 / Math.sqrt(itc_y**2+itc_x**2);
                const cx = Math.sqrt(itc_x**2 - answer**2)
                const cy = Math.sqrt(itc_y**2 - answer**2)
                const fire_y = Math.round((cx*answer)
                             / Math.abs(itc_x)*(itc_y>0 ? 1:-1)*100) /100;
                const fire_x = Math.round((cy*answer)
                             / Math.abs(itc_y)*(itc_x>0 ? 1:-1)*100) /100;

                return [fire_x, fire_y, max_coord[0], max_coord[1]];
            }

            const attr = {
                background: {
                    "stroke-width": 0.0,
                    'fill': '#CAEBFE',
                },
                coordinate: {
                    'stroke': '#2B4373',
                    "stroke-width": 0.0,
                    'fill': '#2B4373',
                    'font-size': '10px',
                },
                your_coordinate: {
                    "stroke-width": 0.0,
                    'fill': '#EB8224',
                    'font-size': '10px',
                },
                wolf: {
                    "stroke-width": 0.0,
                    'fill': '#EB8224',
                },
                other_wolf: {
                    "stroke-width": 0.0,
                    'fill': '#2B4373',
                },
                rifle: {
                    "stroke-width": 0.0,
                    'fill': '#EB8224',
                },
                fire_line: {
                    'stroke': 'red',
                    "stroke-width": 1.0,
                },
                wolf_center: {
                    "stroke-width": 0.0,
                    'fill': '#EB8224',
                },
                rifle_center: {
                    "stroke-width": 0.0,
                    'fill': '#2B4373',
                },
                axis: {
                    "stroke-width": 0.5,
                    'stroke': '#2B4373',
                },
            };

            /*----------------------------------------------*
             *
             * the wild dog
             *
             *----------------------------------------------*/

            const fc = fire_coordinate(tgt_dogs);
            const max_w = Math.max(...dogs.map(d=>Math.abs(d[0])));
            const max_h = Math.max(...dogs.map(d=>Math.abs(d[1])));
            const max_wh = Math.max(max_w, max_h)*2;
            const os = 30;
            const P_SIZE = 300;
            const SCALE = P_SIZE / max_wh;
            const paper = Raphael(dom, P_SIZE+os*2, P_SIZE+os*2, 0, 0);

            // backgound
            paper.rect(os, os, P_SIZE, P_SIZE).attr(attr.background);

            // axis
            paper.path(
                    'M' + (P_SIZE/2+os) + ',' + os +
                    "l" + 0 + ',' + P_SIZE +
                    '').attr(attr.axis);
            paper.path(
                    'M' + os + ',' + (P_SIZE/2+os) +
                    "l" + P_SIZE + ',' + 0 +
                    '').attr(attr.axis);

            // arrow
            paper.path(
                    'M' + (P_SIZE/2+os) + ',' + os +
                    "l" + -2 + ',' + 6 +
                    "l" + 4 + ',' + 0 +
                    'Z').attr(attr.other_wolf);
            paper.path(
                    'M' + (P_SIZE+os) + ',' + (P_SIZE/2+os) +
                    "l" + -6 + ',' + 2 +
                    "l" + 0 + ',' + -4 +
                    'Z').attr(attr.other_wolf);

            const [ax, ay, tx, ty] = fc;

            // other dogs 
            dogs.forEach(d=>{
                const [x, y] = d;
                const [dx, dy] = [(max_wh/2+x)*SCALE+os,
                                    (max_wh/2-y)*SCALE+os];
                draw_wolf(dx, dy, attr.other_wolf);
            });

            // hit dog 
            tgt_dogs.forEach(d=>{
                const [x, y] = d;
                const [dx, dy] = [(max_wh/2+x)*SCALE+os,
                                    (max_wh/2-y)*SCALE+os];
                draw_wolf(dx, dy, attr.wolf);
            });

            // you
            const [you_x, you_y] = [(max_wh/2+ax)*SCALE+os, 
                                    (max_wh/2-ay)*SCALE+os];
            console.log(you_x, you_y);
            draw_rifle(you_x, you_y);

            // shoot line
            paper.path(
                    'M' + ((max_wh/2+ax)*SCALE+os) + ','
                         + ((max_wh/2-ay)*SCALE+os) +
                    "L" + ((max_wh/2+tx)*SCALE+os) + ','
                         + ((max_wh/2-ty)*SCALE+os) +
                    '').attr(attr.fire_line);

            // taget point
            tgt_dogs.forEach(d=>{
                const [x, y] = d;
                const [dx, dy] = [(max_wh/2+x)*SCALE+os,
                                    (max_wh/2-y)*SCALE+os];
                paper.circle(dx, dy, 1.5).attr(attr.rifle_center);
            });

            // non target point
            differense(dogs, tgt_dogs).forEach(d=>{
                const [x, y] = d;
                const [dx, dy] = [(max_wh/2+x)*SCALE+os,
                                    (max_wh/2-y)*SCALE+os];
                paper.circle(dx, dy, 1.5).attr(attr.wolf_center);
            });

            // your point
            paper.circle(you_x, you_y, 1.5).attr(attr.rifle_center);

            // dogs coordinate
            dogs.forEach(d=>{
                const [x, y] = d;
                const [dx, dy] = [(max_wh/2+x)*SCALE+os,
                                    (max_wh/2-y)*SCALE+os];
                paper.text(dx+30, dy,
                    '(' + x + ', ' + y + ')').attr(attr.coordinate);
            });

            // your coordinate
            paper.text(you_x+20, you_y+10,
                    '(' + ax + ', ' + ay + ')').attr(attr.your_coordinate);

            /*----------------------------------------------*
             * wolf
             *----------------------------------------------*/
            function draw_wolf(x, y, color) {

                let [sx, sy] = [x, y];
                const z = 0.5;
                sx -= 21*z;
                sy += 2*z;

                paper.path(
                        'M' + (sx) + ',' + (sy) +
                        "l" + (16*z) + ',' + (-6*z) +
                        "l" + (0*z) + ',' + (-10*z) +
                        "l" + (2*z) + ',' + (0*z) +
                        "l" + (8*z) + ',' + (10*z) +
                        "l" + (6*z) + ',' + (10*z) +
                        "l" + (-10*z) + ',' + (10*z) +
                        "l" + (-4*z) + ',' + (-10*z) +
                        "l" + (-12*z) + ',' + (0*z) +
                        'Z').attr(color);
            }

            /*----------------------------------------------*
             * rifle
             *----------------------------------------------*/
            function draw_rifle(x, y) {

                let [sx, sy] = [x, y];
                sx -= 20;
                sy += 0;
                const z = 1.5;

                paper.path(
                        'M' + (sx) + ',' + (sy) +
                        "l" + (6*z) + ',' + (-1*z) +
                        "l" + (20*z) + ',' + (0*z) +
                        "l" + (0*z) + ',' + (1*z) +
                        "l" + (-8*z) + ',' + (0*z) +
                        "l" + (0*z) + ',' + (1*z) +
                        "l" + (-8*z) + ',' + (0*z) +
                        "l" + (-6*z) + ',' + (3*z) +
                        'Z').attr(attr.rifle);
            }
        }
        
        var $tryit;

        var io = new extIO({
            multipleArguments: false,
            functions: {
                python: 'wild_dogs',
                js: 'wildDogs'
            },
            animation: function($expl, data){
                wildDogsCanvas($expl[0],
                    data.in, data.ext.explanation);
            }
        });
        io.start();
    }
);
