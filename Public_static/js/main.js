let ret = "";
$( function () {
    let spen = $('#spend');
    let tran  = $('#trans');
    let box  = $('#box');
    let invest = $('#invest');
    let over = $('#overview');
    let rem = $('#rem');
    x();
    overv();
    rem.click(setrem)
    over.click(overv);
    spen.click(function () {
        console.log('in fun');
        $.post('/spen', {user:ret}, function (data) {
            if (data.status==='found') {
                box.empty();
                box.append(`<div class="col" style="margin-top: 30px" id="nb">
                </div>`);
                console.log('submit');
                for(i in data.data) {
                    console.log(box);
                    $('#nb').append(`<div class="card" style="margin-top: 20px">
                <div class="card-body">
                Spent on ${data.data[i].detail} <br><br><strong style="margin-left: 50px">Amount:</strong>&nbsp;${data.data[i].amount} <strong style="margin-left: 600px">Mode:</strong>&nbsp;${data.data[i].Mode} 
                </div>
                </div>
                    `);
                }
                }
            else {
                console.log('no success');
            }
        })

    });
    invest.click(function () {
        console.log('in fun');
        $.post('/invest', {user:ret}, function (data) {
            if (data.status==='found') {
                box.empty();
                box.append(`<div class="col" style="margin-top: 30px" id="nb">
                </div>`);
                console.log('submit');
                for(i in data.data) {
                    console.log(box);
                    $('#nb').append(`<div class="card" style="margin-top: 20px">
                <div class="card-body">
                Invested on ${data.data[i].detail} <br><br><strong style="margin-left: 50px">Amount:</strong>&nbsp;${data.data[i].amount} <strong style="margin-left: 600px">Mode:</strong>&nbsp;${data.data[i].Mode} 
                </div>
                </div>
                    `);
                }
            }
            else {
                console.log('no success');
            }
        })

    });
    tran.click(crtran);

})
const x = function () {
    ret= sessionStorage.getItem('name');
};
const setrem = function () {
    console.log('in fun');
    let box  = $('#box');
    box.empty();
    box.append(`
        <div class="card" style="max-height: 100%;width:100%;margin-left: 5px;margin-top: 20px">
            <div class="card-body lec" style="margin-left: 190px">
        <form  style="height: 100%;width: 100%">
            <div class="alert alert-danger" role="alert" style="text-align: center;width: 300px;margin-left: 150px;margin-bottom: 25px">
                Reminder
            </div>
            <div style="margin-top: 10px;margin-left: 100px">
            <label style="margin-left: -10px">Description</label>
            <div class="col-lg-9" id="desc">
                <div class="form-check" style="margin-top: 20px">

                    <label class="form-check-label" style="margin-top: 1px">
                        <input type="radio" value="Interest"  name="cb" class="f3">
                        &nbsp;&nbsp;Interest
                    </label>
                    <label class="form-check-label ">
                        <input type="radio" value="Electricity Bills" name="cb" style="margin-left: 10px" class="f3">
                        &nbsp;&nbsp;Electricity Bills
                    </label>
                    <br>
                    <label class="form-check-label " style="margin-top: 10px">
                        <input type="radio" value="Fees" name="cb" style="margin-left: 1px" class="f3">
                        &nbsp;&nbsp;Fees
                    </label>

                    <label class="form-check-label">
                        <input type="radio" value="DTH Bills" name="cb" style="margin-left: 50px" class="f3">
                        &nbsp;DTH Bills
                    </label>
                    <br>
                    <label class="form-check-label " style="margin-top: 10px" >
                        <input type="radio" value="Rent" style="margin-left: 1px" name="cb" class="f3">
                        &nbsp;&nbsp;Rent                    </label>

                    <label class="form-check-label ">
                        <input type="radio" value="Phone Bills" style="margin-left: 35px" name="cb" class="f3">
                        &nbsp;&nbsp;Phone Bills
                    </label>
                    <br>
                    <label class="form-check-label" style="margin-top: 10px">
                        <input type="radio" value="Water Bills" style="margin-left: 1px" name="cb" class="f3">
                        &nbsp;&nbsp;Water Bills
                    </label>
                    <label class="form-check-label ">
                        <input type="radio" value="EMIs" style="margin-left: 30px" name="cb" class="f3">
                        &nbsp;&nbsp;EMIs
                    </label>
                </div>
            </div>
        </div>
            <div style="margin-top: 20px;margin-left: 100px  ">
             <label>Amount</label>
                <div class="col-lg-6">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Enter Amount" id="amt" style="margin-top: 12px" aria-label="Text input with radio button">
                    </div>
            </div>
            </div>
        <div style="margin-top: 20px;margin-left: 100px  ">
             <label>Last Date</label>
                <div class="col-lg-6">
                    <div class="input-group">
                        <input type="date" class="form-control"  id="dat" style="margin-top: 12px" aria-label="Text input with radio button">
                    </div>
            </div>
            </div>


            <button type="button" id="submit"  class="btn btn-primary" style="margin-top: 40px;margin-left: 260px">Submit</button>
        </form>

        
            </div>
        </div>
`)
    let submit = $('#submit');
    submit.click(function () {
        let amt = $('#amt');
        let det = $('input[name="cb"]:checked');
        let dat = $('#dat');
        $.post('/rem', {amt:amt.val(),det:det.val(),user:ret,dat:dat.val()}, function (data) {
            window.location.href = "main.html";
            if (data.status==='found') {
                console.log('success');

            }
            else {
                console.log('no success');
            }
        })
    })

}
const crtran =  function () {
    console.log('in fun');
    let box  = $('#box');
    box.empty();
    box.append(`
        <div class="card" style="height: 500px;margin-left: 5px;margin-top: 20px">
            <div class="card-body lec" style="margin-left: 127px">
        <form >
            <div class="alert alert-success" role="alert" style="text-align: center;width: 300px;margin-left: 220px;margin-bottom: 25px">
                Transaction
            </div>

            <label style="margin-top: 20px">Type</label>
            <div class="form-check" style="margin-top: 10px">

                <label class="form-check-label" id="spen">
                    <input type="radio" value="Spending" style="margin-left: 10px" name="cp" class="f2">
                    &nbsp;&nbsp;Spendings
                </label>

                <label class="form-check-label " id="inv">
                    <input type="radio" value="Investment" style="margin-left: 20px" name="cp" class="f2"  >
                    &nbsp;Investment
                </label>

            </div>

            <label style="margin-top: 15px">Mode</label>
            <div class="form-check" style="margin-top: 10px">

                <label class="form-check-label">
                    <input type="radio" value="cash" style="margin-left: 10px" name="cd" class="f1">
                    &nbsp;&nbsp;Cash
                </label>
                <label class="form-check-label ">
                    <input type="radio" value="card" style="margin-left: 40px" class="f1" name="cd">
                    &nbsp;&nbsp;Card
                </label>

                <label class="form-check-label ">
                    <input type="radio" value="online" style="margin-left: 40px" class="f1" name="cd">
                    &nbsp;&nbsp;Online
                </label>

            </div>
            <div style="margin-top: 20px">
             <label>Amount</label>
                <div class="col-lg-6">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Enter Amount" id="amt" style="margin-top: 12px" aria-label="Text input with radio button">
                    </div>
            </div>
            </div>


            <button type="button" id="submit"  class="btn btn-primary" style="margin-top: 40px;margin-left: 330px">Submit</button>
        </form>

        <div style="margin-top: 100px;margin-left: -30px">
            <label style="margin-left: 10px">Description</label>
            <div class="col-lg-9" id="desc">
                <div class="form-check" style="margin-top: 20px">

                    <label class="form-check-label" style="margin-top: 1px">
                        <input type="radio" value="Food"  name="cb" class="f3">
                        &nbsp;&nbsp;Food & Drinks
                    </label>
                    <label class="form-check-label ">
                        <input type="radio" value="Bills" name="cb" style="margin-left: 10px" class="f3">
                        &nbsp;&nbsp;Bills
                    </label>

                    <label class="form-check-label " style="margin-top: 10px">
                        <input type="radio" value="Salary" name="cb" style="margin-left: 1px" class="f3">
                        &nbsp;&nbsp;Salary
                    </label>

                    <label class="form-check-label">
                        <input type="radio" value="Interest" name="cb" style="margin-left: 50px" class="f3">
                        &nbsp;Interest
                    </label>
                    <label class="form-check-label " style="margin-top: 10px" >
                        <input type="radio" value="Shopping" style="margin-left: 1px" name="cb" class="f3">
                        &nbsp;&nbsp;Shoppings
                    </label>

                    <label class="form-check-label ">
                        <input type="radio" value="Fuel" style="margin-left: 35px" name="cb" class="f3">
                        &nbsp;&nbsp;Fuel
                    </label>

                    <label class="form-check-label" style="margin-top: 10px">
                        <input type="radio" value="Grocery" style="margin-left: 1px" name="cb" class="f3">
                        &nbsp;&nbsp;Grocery
                    </label>
                    <label class="form-check-label ">
                        <input type="radio" value="Misc" style="margin-left: 30px" name="cb" class="f3">
                        &nbsp;&nbsp;Misc
                    </label>
                </div>
            </div>
        </div>
            </div>
        </div>
`)
    let submit = $('#submit');
    let inv = $('#inv');
    let spen = $('#spen');
    submit.click(function () {
        let type = $('input[name="cp"]:checked');
        let amt = $('#amt');
        let mode = $('input[name="cd"]:checked');
        let det = $('input[name="cb"]:checked');
        console.log(type.val())
        $.post('/tran', {type:type.val(),amt:amt.val(),mode:mode.val() ,det:det.val(),user:ret}, function (data) {
            console.log('submit');
            window.location.href = "main.html";
            if (data.status==='found') {
                console.log('success');

            }
            else {
                console.log('no success');
            }
        })
    })
    let desc = $('#desc');
    inv.click(function () {
        desc.empty();
        desc.append(`<div class="form-check" style="margin-top: 20px">

                    <label class="form-check-label" style="margin-top: 1px">
                        <input type="radio" value="Shares" name="cb" class="f3">
                        &nbsp;&nbsp;Shares
                    </label>
                    <label class="form-check-label ">
                        <input type="radio" value="Real Estate" name="cb" style="margin-left: 10px" class="f3">
                        &nbsp;&nbsp;Real Estate
                    </label>

                    <label class="form-check-label " style="margin-top: 10px">
                        <input type="radio" value="FDs" name="cb" style="margin-left: 1px" class="f3">
                        &nbsp;&nbsp;FDs
                    </label>

                    <label class="form-check-label">
                        <input type="radio" value="Policies" name="cb" style="margin-left: 50px" class="f3">
                        &nbsp;Policies
                    </label>
                </div>`)
    })
    spen.click(function () {
        desc.empty();
        desc.append(`<div class="form-check" style="margin-top: 20px">

                    <label class="form-check-label" style="margin-top: 1px">
                        <input type="radio" value="Food"  name="cb" class="f3">
                        &nbsp;&nbsp;Food & Drinks
                    </label>
                    <label class="form-check-label ">
                        <input type="radio" value="Bills" name="cb" style="margin-left: 10px" class="f3">
                        &nbsp;&nbsp;Bills
                    </label>

                    <label class="form-check-label " style="margin-top: 10px">
                        <input type="radio" value="Salary" name="cb" style="margin-left: 1px" class="f3">
                        &nbsp;&nbsp;Salary
                    </label>

                    <label class="form-check-label">
                        <input type="radio" value="Interest" name="cb" style="margin-left: 50px" class="f3">
                        &nbsp;Interest
                    </label>
                    <label class="form-check-label " style="margin-top: 10px" >
                        <input type="radio" value="Shopping" style="margin-left: 1px" name="cb" class="f3">
                        &nbsp;&nbsp;Shoppings
                    </label>

                    <label class="form-check-label ">
                        <input type="radio" value="Fuel" style="margin-left: 35px" name="cb" class="f3">
                        &nbsp;&nbsp;Fuel
                    </label>

                    <label class="form-check-label" style="margin-top: 10px">
                        <input type="radio" value="Grocery" style="margin-left: 1px" name="cb" class="f3">
                        &nbsp;&nbsp;Grocery
                    </label>
                    <label class="form-check-label ">
                        <input type="radio" value="Misc" style="margin-left: 30px" name="cb" class="f3">
                        &nbsp;&nbsp;Misc
                    </label>
                </div>
            `)
    })
    console.log(submit);
}
const overv = function () {

    let box  = $('#box');
    box.empty();
    box.append(`<div class="col" id="tab" style="width: 100%;margin-top: 20px"></div>`);
    let tab = $('#tab');
    tab.append(`<div id="chartContainer" style="height: 300px; width: 50%; margin-left: -10px ;display: inline-table"></div>`);
    tab.append(`<div id="chartContainer2" style="height: 300px; width: 50%; margin-left: -10px ;display: inline-table"></div>`);
    $.post('/overview1',{user:ret},function (data) {
        let fam = 0;
        let sham = 0;
        let fuam = 0;
        let Bam = 0;
        let Gam = 0;
        let Iam = 0;
        let Mam = 0;
        for (i in data)
        {
            if(data[i].detail == 'Food')
                fam += data[i].amount
            if(data[i].detail == 'Shopping')
                sham += data[i].amount
            if(data[i].detail == 'Misc')
                Mam += data[i].amount
            if(data[i].detail == 'Fuel')
                fuam += data[i].amount
            if(data[i].detail == 'Bills')
                Bam += data[i].amount
            if(data[i].detail == 'Grocery')
                Gam += data[i].amount
            if(data[i].detail == 'Interest')
                Iam += data[i].amount
        }
        let t = sham + fam + fuam +Bam + Gam +Iam +Mam;
        let shp = (sham/t)*100;
        let fp = (fam/t)*100;
        let mp = (Mam/t)*100;
        let fup = (fuam/t)*100;
        let bp = (Bam/t)*100;
        let gp = (Gam/t)*100;
        let ip = (Iam/t)*100;

        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title:{
                text: "Spendings",
                fontWeight: "Bold",
                fontColor: "#14CC60",
                fontFamily: "tahoma",

                horizontalAlign: "center"
            },
            data: [{
                type: "doughnut",
                startAngle: 60,
                //innerRadius: 60,
                indexLabelFontSize: 15,
                indexLabel: "{label} - #percent%",
                toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                dataPoints: [
                    { y: fp, label: "Food & Drinks", },
                    { y: shp, label: "Shopping" },
                    { y: fup, label: "Fuel" },
                    { y: bp, label: "Bills"},
                    { y: gp, label: "Grocery"},
                    { y: ip, label: "Interest"},
                    { y: mp, label: "Misc"}
                ]
            }]
        });
        chart.render();
    });
    $.post('/overview2',{user:ret},function (data) {
        let sham = 0;
        let ram = 0;
        let pam = 0;
        let fam = 0;
        for (i in data)
        {
            if(data[i].detail == 'Shares')
                sham += data[i].amount
            if(data[i].detail == 'Policies')
                pam += data[i].amount
            if(data[i].detail == 'FDs')
                fam += data[i].amount
            if(data[i].detail == 'Real Estate')
                ram += data[i].amount
        }
        let t = sham + ram + pam +fam;
        let sp = (sham/t)*100;
        let rp = (ram/t)*100;
        let pp = (pam/t)*100;
        let fp = (fam/t)*100;
        var chart = new CanvasJS.Chart("chartContainer2", {
            animationEnabled: true,
            title:{
                text: "Investments",
                fontWeight: "Bold",
                fontColor: "#14CC60",
                fontFamily: "tahoma",

                horizontalAlign: "center"
            },
            data: [{
                type: "doughnut",
                startAngle: 60,
                //innerRadius: 60,
                indexLabelFontSize: 15,
                indexLabel: "{label} - #percent%",
                toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                dataPoints: [
                    { y: fp, label: "FDs", },
                    { y: sp, label: "Shares" },
                    { y: rp, label: "Real Estate" },
                    { y: pp, label: "Policies"},
                ]
            }]
        });
        chart.render();

    });

    $.post('/down', {user:ret}, function (data) {
        if (data.status==='found') {
            tab.append(`<div class="col" style="margin-top: 60px" id="npl">
                </div>`);
            for(i in data.data) {
                console.log(box);
                $('#npl').append(`<div class="card" style="margin-top: 20px">
                <div class="card-body">
                ${data.data[i].detail} is Due <br><br><strong style="margin-left: 50px">Last Date:</strong>&nbsp;${data.data[i].date} <strong style="margin-left: 480px">Amount:</strong>&nbsp;${data.data[i].amount} 
                </div>
                </div>
                    `);
            }
        }
        else {
            console.log('no success');
        }
    })



}
