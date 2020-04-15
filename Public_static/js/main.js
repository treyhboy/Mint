let ret = '';
$(function() {
    const spen = $('#spend');
    const tran = $('#trans');
    const box = $('#box');
    const invest = $('#invest');
    const over = $('#overview');
    const rem = $('#rem');
    x();
    overv();
    rem.click(setrem);
    over.click(overv);
    spen.click(function() {
        console.log('in fun');
        $.post('/spen', { user: ret }, function(data) {
            if (data.status === 'found') {
                box.empty();
                box.append(`<div class="col" style="margin-top: 30px" id="nb">
                </div>`);
                console.log('submit');
                data.data.forEach(function(element) {
                    console.log(box);
                    const { amount, detail, Mode } = element;
                    $('#nb').append(`<div class="card" style="margin-top: 20px">
                <div class="card-body">
                Spent on ${detail} <br><br><strong style="margin-left: 50px">Amount:</strong>&nbsp;${amount} <strong style="margin-left: 600px">Mode:</strong>&nbsp;${Mode}
                </div>
                </div>
                    `);
                });
            } else {
                console.log('no success');
            }
        });
    });
    invest.click(function() {
        console.log('in fun');
        $.post('/invest', { user: ret }, function(data) {
            if (data.status === 'found') {
                box.empty();
                box.append(`<div class="col" style="margin-top: 30px" id="nb">
                </div>`);
                console.log('submit');
                data.data.forEach(function(element) {
                    console.log(box);
                    const { detail, amount, Mode } = element;
                    $('#nb').append(`<div class="card" style="margin-top: 20px">
                <div class="card-body">
                Invested on ${detail} <br><br><strong style="margin-left: 50px">Amount:</strong>&nbsp;${amount} <strong style="margin-left: 600px">Mode:</strong>&nbsp;${Mode}
                </div>
                </div>
                    `);
                });
            } else {
                console.log('no success');
            }
        });
    });
    tran.click(crtran);
});
const x = function() {
    ret = sessionStorage.getItem('name');
};
const setrem = function() {
    console.log('in fun');
    const box = $('#box');
    box.empty();
    box.append(`
        <div class="card justify-content-center" style="margin-top: 20px;">
            <div class="card-body justify-content-center">
                <div class="row justify-content-center">
                    <div class="col alert alert-success" role="alert" style="text-align: center; max-width: 300px; margin-bottom: 25px">
                        Reminder
                    </div>
                </div>

                <div class="row justify-content-center">
                    <form>
                        <div style="margin-top: 10px;">
                            <label>Description</label>
                            <div id="desc">
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
                    </form>
                </div>
                <div class="row justify-content-center">
                    <form>
                        <div style="margin-top: 20px;">
                            <label>Amount</label>
                            <div class="col">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Enter Amount" id="amt" style="margin-top: 12px" aria-label="Text input with radio button">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row justify-content-center">
                    <form>
                        <div style="margin-top: 20px;">
                            <label>Last Date</label>
                            <div class="col">
                                <div class="input-group">
                                    <input type="date" class="form-control"  id="dat" style="margin-top: 12px" aria-label="Text input with radio button">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col"  style="text-align: center; margin: 10px">
                                <button type="button" id="submit"  class="btn btn-primary" style="margin-top: 40px;">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
`);
    const submit = $('#submit');
    submit.click(function() {
        const amt = $('#amt');
        const det = $('input[name="cb"]:checked');
        const dat = $('#dat');
        $.post(
            '/rem',
            { amt: amt.val(), det: det.val(), user: ret, dat: dat.val() },
            function(data) {
                window.location.href = 'main.html';
                if (data.status === 'found') {
                    console.log('success');
                } else {
                    console.log('no success');
                }
            }
        );
    });
};
const crtran = function() {
    console.log('in fun');
    const box = $('#box');
    box.empty();
    box.append(`
        <div class="card justify-content-center" style="margin-top: 20px;">
            <div class="card-body justify-content-center">
               <div class="row justify-content-center">
                    <div class="col alert alert-success" role="alert" style="text-align: center; max-width: 300px; margin-bottom: 25px">
                        Transaction
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg">
                        <form>
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
                            <label>Description</label>
                            <div id="desc">
                                <div class="row form-check">
                                    <label class="form-check-label">
                                        <input type="radio" value="Food"  name="cb" class="f3" style="margin-left: 25px">
                                        &nbsp;&nbsp;Food & Drinks
                                    </label>
                                    <label class="form-check-label ">
                                        <input type="radio" value="Bills" name="cb" class="f3" style="margin-left: 25px">
                                        &nbsp;&nbsp;Bills
                                    </label>
                                    <br>
                                    <label class="form-check-label ">
                                        <input type="radio" value="Salary" name="cb" class="f3" style="margin-left: 25px">
                                        &nbsp;&nbsp;Salary
                                    </label>
                                    <label class="form-check-label">
                                        <input type="radio" value="Interest" name="cb"  class="f3" style="margin-left: 25px">
                                        &nbsp;Interest
                                    </label>
                                    <br>
                                    <label class="form-check-label " >
                                        <input type="radio" value="Shopping" name="cb" class="f3" style="margin-left: 25px">
                                        &nbsp;&nbsp;Shoppings
                                    </label>
                                    <label class="form-check-label ">
                                        <input type="radio" value="Fuel"  name="cb" class="f3" style="margin-left: 25px">
                                        &nbsp;&nbsp;Fuel
                                    </label>
                                    <br>
                                    <label class="form-check-label" >
                                        <input type="radio" value="Grocery"  name="cb" class="f3" style="margin-left: 25px">
                                        &nbsp;&nbsp;Grocery
                                    </label>
                                    <label class="form-check-label ">
                                        <input type="radio" value="Misc"  name="cb" class="f3" style="margin-left: 25px">
                                        &nbsp;&nbsp;Misc
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg">
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
                    </div>
                </div>
                <div class="row">
                    <div class="col"  style="text-align: center; margin: 10px">
                        <button type="button" id="submit"  class="btn btn-primary" style="margin-top: 40px;">Submit</button>
                    </div>
                </div>
            </div>
        </div>
`);
    const submit = $('#submit');
    const inv = $('#inv');
    const spen = $('#spen');
    submit.click(function() {
        const type = $('input[name="cp"]:checked');
        const amt = $('#amt');
        const mode = $('input[name="cd"]:checked');
        const det = $('input[name="cb"]:checked');
        console.log(type.val());
        $.post(
            '/tran',
            {
                type: type.val(),
                amt: amt.val(),
                mode: mode.val(),
                det: det.val(),
                user: ret,
            },
            function(data) {
                console.log('submit');
                window.location.href = 'main.html';
                if (data.status === 'found') {
                    console.log('success');
                } else {
                    console.log('no success');
                }
            }
        );
    });
    const desc = $('#desc');
    inv.click(function() {
        desc.empty();
        desc.append(`<div class="form-check" style="margin-top: 20px">

                    <label class="form-check-label" style="margin-top: 1px">
                        <input type="radio" value="Shares" name="cb" style="margin-left: 25px" class="f3">
                        &nbsp;&nbsp;Shares
                    </label>
                    <label class="form-check-label ">
                        <input type="radio" value="Real Estate" name="cb" style="margin-left: 25px" class="f3">
                        &nbsp;&nbsp;Real Estate
                    </label>

                    <label class="form-check-label " style="margin-top: 10px">
                        <input type="radio" value="FDs" name="cb" style="margin-left: 25px" class="f3">
                        &nbsp;&nbsp;FDs
                    </label>

                    <label class="form-check-label">
                        <input type="radio" value="Policies" name="cb" style="margin-left: 25px" class="f3">
                        &nbsp;Policies
                    </label>
                </div>`);
    });
    spen.click(function() {
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
            `);
    });
    console.log(submit);
};
const overv = function() {
    const box = $('#box');
    box.empty();
    box.append(
        `<div class="col" id="tab" style="width: 100%;margin-top: 20px"></div>`
    );
    const tab = $('#tab');
    tab.append(
        `<div id="chartContainer" style="height: 300px; width: 50%; margin-left: -10px ;display: inline-table"></div>`
    );
    tab.append(
        `<div id="chartContainer2" style="height: 300px; width: 50%; margin-left: -10px ;display: inline-table"></div>`
    );
    $.post('/overview1', { user: ret }, function(data) {
        let fam = 0;
        let sham = 0;
        let fuam = 0;
        let Bam = 0;
        let Gam = 0;
        let Iam = 0;
        let Mam = 0;
        data.forEach(function(element) {
            const { detail, amount } = element;
            if (detail === 'Food') fam += amount;
            if (detail === 'Shopping') sham += amount;
            if (detail === 'Misc') Mam += amount;
            if (detail === 'Fuel') fuam += amount;
            if (detail === 'Bills') Bam += amount;
            if (detail === 'Grocery') Gam += amount;
            if (detail === 'Interest') Iam += amount;
        });
        const t = sham + fam + fuam + Bam + Gam + Iam + Mam;
        const shp = (sham / t) * 100;
        const fp = (fam / t) * 100;
        const mp = (Mam / t) * 100;
        const fup = (fuam / t) * 100;
        const bp = (Bam / t) * 100;
        const gp = (Gam / t) * 100;
        const ip = (Iam / t) * 100;

        const chart = new CanvasJS.Chart('chartContainer', {
            animationEnabled: true,
            title: {
                text: 'Spendings',
                fontWeight: 'Bold',
                fontColor: '#14CC60',
                fontFamily: 'tahoma',

                horizontalAlign: 'center',
            },
            data: [
                {
                    type: 'doughnut',
                    startAngle: 60,
                    // innerRadius: 60,
                    indexLabelFontSize: 15,
                    indexLabel: '{label} - #percent%',
                    toolTipContent: '<b>{label}:</b> {y} (#percent%)',
                    dataPoints: [
                        { y: fp, label: 'Food & Drinks' },
                        { y: shp, label: 'Shopping' },
                        { y: fup, label: 'Fuel' },
                        { y: bp, label: 'Bills' },
                        { y: gp, label: 'Grocery' },
                        { y: ip, label: 'Interest' },
                        { y: mp, label: 'Misc' },
                    ],
                },
            ],
        });
        chart.render();
    });
    $.post('/overview2', { user: ret }, function(data) {
        let sham = 0;
        let ram = 0;
        let pam = 0;
        let fam = 0;
        data.forEach(function(element) {
            const { detail, amount } = element;
            if (detail === 'Shares') sham += amount;
            if (detail === 'Policies') pam += amount;
            if (detail === 'FDs') fam += amount;
            if (detail === 'Real Estate') ram += amount;
        });
        const t = sham + ram + pam + fam;
        const sp = (sham / t) * 100;
        const rp = (ram / t) * 100;
        const pp = (pam / t) * 100;
        const fp = (fam / t) * 100;
        const chart = new CanvasJS.Chart('chartContainer2', {
            animationEnabled: true,
            title: {
                text: 'Investments',
                fontWeight: 'Bold',
                fontColor: '#14CC60',
                fontFamily: 'tahoma',

                horizontalAlign: 'center',
            },
            data: [
                {
                    type: 'doughnut',
                    startAngle: 60,
                    // innerRadius: 60,
                    indexLabelFontSize: 15,
                    indexLabel: '{label} - #percent%',
                    toolTipContent: '<b>{label}:</b> {y} (#percent%)',
                    dataPoints: [
                        { y: fp, label: 'FDs' },
                        { y: sp, label: 'Shares' },
                        { y: rp, label: 'Real Estate' },
                        { y: pp, label: 'Policies' },
                    ],
                },
            ],
        });
        chart.render();
    });

    $.post('/down', { user: ret }, function(data) {
        if (data.status === 'found') {
            tab.append(`<div class="col" style="margin-top: 60px" id="npl">
                </div>`);
            data.data.forEach(function(element) {
                console.log(box);
                const { date, detail, amount } = element;
                $('#npl').append(`<div class="card" style="margin-top: 20px">
                <div class="card-body">
                ${detail} is Due <br><br><strong style="margin-left: 50px">Last Date:</strong>&nbsp;${date} <strong style="margin-left: 480px">Amount:</strong>&nbsp;${amount}
                </div>
                </div>
                    `);
            });
        } else {
            console.log('no success');
        }
    });
};

$('.nav-link').on('click', function(event) {
    if (this.hash !== '') {
        event.preventDefault();

        const { hash } = this;

        $('html, body').animate(
            {
                scrollTop: $(hash).offset().top,
            },
            800,
            function() {
                window.location.hash = hash;
            }
        );
    }
});
