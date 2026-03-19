window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'Curves in R\u207F',
    subtitle: 'Parametrized curves and their geometry',
    sections: [
        // ================================================================
        // SECTION 1: Why Curves?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Curves?',
            content: `
<h2>Why Curves?</h2>

<div class="env-block intuition">
    <div class="env-title">Curves Are Everywhere</div>
    <div class="env-body">
        <p>A highway interchange traces a space curve. A planet follows an elliptical orbit. The double helix of DNA winds through three-dimensional space. Each of these is a <em>curve</em>, an object that is intrinsically one-dimensional but lives in a higher-dimensional ambient space.</p>
        <p>Differential geometry begins by asking: what does it mean for a curve to bend? How do we measure the "shape" of a curve at a point? To answer these questions, we first need a precise language for describing curves.</p>
    </div>
</div>

<p>Curves are the simplest objects in differential geometry, yet they already exhibit the central themes of the subject: <strong>parametrization</strong> (how we describe geometric objects), <strong>invariance</strong> (which properties depend on the description and which are intrinsic to the object), and <strong>local versus global</strong> (what can we see at a point versus what requires the whole curve).</p>

<h3>Motivating Examples</h3>

<p>Consider these four curves, each appearing naturally in science and engineering:</p>

<ol>
    <li><strong>The circle</strong> \\(\\alpha(t) = (\\cos t, \\sin t)\\): the orbit of uniform circular motion. Its curvature is constant.</li>
    <li><strong>The helix</strong> \\(\\alpha(t) = (\\cos t, \\sin t, bt)\\): a spring, a screw thread, the path of a charged particle in a uniform magnetic field. It has constant curvature <em>and</em> constant torsion.</li>
    <li><strong>The cycloid</strong> \\(\\alpha(t) = (t - \\sin t, 1 - \\cos t)\\): the path traced by a point on a rolling wheel. It is the curve of fastest descent (the brachistochrone) and the curve of equal time (the tautochrone).</li>
    <li><strong>DNA</strong>: a double helix, two intertwined space curves with a fixed angular offset. The geometry of the helix constrains the biochemistry of genetic information.</li>
</ol>

<p>All of these are described by a common framework: a smooth map from an interval into \\(\\mathbb{R}^n\\). This chapter develops that framework.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>The systematic study of curves in space began with Euler and Monge in the 18th century. The key notions of curvature and torsion were developed by Frenet and Serret in the 1850s. Our treatment follows do Carmo's <em>Differential Geometry of Curves and Surfaces</em>, which begins with curves before moving to surfaces and ultimately to the intrinsic geometry of Riemannian manifolds.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-curve-tracer"></div>
`,
            visualizations: [
                {
                    id: 'viz-curve-tracer',
                    title: 'Curve Tracer',
                    description: 'Watch a point trace out different curves. Select a curve from the dropdown and press Play. The trailing path shows where the point has been.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 50
                        });

                        var curves = {
                            'Circle': function(t) { return [Math.cos(t), Math.sin(t)]; },
                            'Helix (oblique)': function(t) {
                                var x = Math.cos(t), y = Math.sin(t), z = t * 0.3;
                                return [x - 0.3 * y, z - 0.3 * x + 0.5 * y];
                            },
                            'Cycloid': function(t) { return [(t - Math.sin(t)) * 0.5 - 2.5, (1 - Math.cos(t)) * 0.5 - 1]; },
                            'Lissajous': function(t) { return [Math.sin(3 * t), Math.sin(2 * t)]; },
                            'Figure-8': function(t) { return [Math.sin(t), Math.sin(t) * Math.cos(t)]; }
                        };
                        var curveNames = Object.keys(curves);
                        var currentCurve = 'Circle';
                        var tMax = { 'Circle': 2 * Math.PI, 'Helix (oblique)': 6 * Math.PI, 'Cycloid': 4 * Math.PI, 'Lissajous': 2 * Math.PI, 'Figure-8': 2 * Math.PI };
                        var playing = false;
                        var tParam = 0;
                        var speed = 0.015;

                        // Dropdown
                        var sel = document.createElement('select');
                        sel.style.cssText = 'padding:3px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;margin-right:8px;';
                        curveNames.forEach(function(n) {
                            var o = document.createElement('option');
                            o.value = n; o.textContent = n;
                            sel.appendChild(o);
                        });
                        sel.addEventListener('change', function() {
                            currentCurve = sel.value;
                            tParam = 0;
                            draw();
                        });
                        controls.appendChild(sel);

                        var playBtn = VizEngine.createButton(controls, 'Play', function() {
                            if (playing) { playing = false; playBtn.textContent = 'Play'; return; }
                            playing = true;
                            playBtn.textContent = 'Pause';
                            tParam = 0;
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            tParam = 0; playing = false; playBtn.textContent = 'Play'; draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;
                            var fn = curves[currentCurve];
                            var T = tMax[currentCurve];

                            // Draw full curve faintly
                            ctx.strokeStyle = viz.colors.blue + '33';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 500; i++) {
                                var tt = T * i / 500;
                                var p = fn(tt);
                                var s = viz.toScreen(p[0], p[1]);
                                if (!started) { ctx.moveTo(s[0], s[1]); started = true; }
                                else ctx.lineTo(s[0], s[1]);
                            }
                            ctx.stroke();

                            // Draw traced portion
                            if (tParam > 0) {
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var steps = Math.max(2, Math.floor(tParam / T * 500));
                                started = false;
                                for (var j = 0; j <= steps; j++) {
                                    var tt2 = tParam * j / steps;
                                    var p2 = fn(tt2);
                                    var s2 = viz.toScreen(p2[0], p2[1]);
                                    if (!started) { ctx.moveTo(s2[0], s2[1]); started = true; }
                                    else ctx.lineTo(s2[0], s2[1]);
                                }
                                ctx.stroke();
                            }

                            // Draw moving point
                            var pt = fn(tParam);
                            viz.drawPoint(pt[0], pt[1], viz.colors.orange, null, 6);

                            // Label
                            viz.screenText(currentCurve, viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('t = ' + tParam.toFixed(2), viz.width / 2, viz.height - 14, viz.colors.text, 11);
                        }

                        viz.animate(function() {
                            if (playing) {
                                tParam += speed;
                                if (tParam > tMax[currentCurve]) {
                                    tParam = tMax[currentCurve];
                                    playing = false;
                                    playBtn.textContent = 'Play';
                                }
                            }
                            draw();
                        });

                        return viz;
                    }
                }
            ],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Parametrized Curves
        // ================================================================
        {
            id: 'sec-parametrization',
            title: 'Parametrized Curves',
            content: `
<h2>Parametrized Curves</h2>

<div class="env-block definition">
    <div class="env-title">Definition 0.1 (Parametrized Curve)</div>
    <div class="env-body">
        <p>A <strong>parametrized differentiable curve</strong> is a differentiable map \\(\\alpha: I \\to \\mathbb{R}^n\\), where \\(I \\subseteq \\mathbb{R}\\) is an open interval. We write</p>
        \\[\\alpha(t) = (\\alpha_1(t), \\alpha_2(t), \\ldots, \\alpha_n(t)),\\]
        <p>where each component function \\(\\alpha_i: I \\to \\mathbb{R}\\) is differentiable. We say \\(\\alpha\\) is <strong>smooth</strong> (or \\(C^\\infty\\)) if each \\(\\alpha_i\\) has derivatives of all orders.</p>
    </div>
</div>

<p>The parameter \\(t\\) is often thought of as "time," and \\(\\alpha(t)\\) as the position of a moving particle at time \\(t\\). The <strong>trace</strong> (or image) of \\(\\alpha\\) is the set \\(\\alpha(I) \\subseteq \\mathbb{R}^n\\). Two different parametrizations can have the same trace.</p>

<div class="env-block example">
    <div class="env-title">Example: Two Parametrizations of the Circle</div>
    <div class="env-body">
        <p>The maps \\(\\alpha(t) = (\\cos t, \\sin t)\\) and \\(\\beta(t) = (\\cos 2t, \\sin 2t)\\), both on \\(I = (0, 2\\pi)\\), have the same trace (the unit circle) but are different parametrized curves. The second traverses the circle twice as fast.</p>
    </div>
</div>

<div class="env-block warning">
    <div class="env-title">Curve vs. Trace</div>
    <div class="env-body">
        <p>A parametrized curve is <em>not</em> the same as its trace. The curve \\(\\alpha(t) = (t^3, t^3)\\) for \\(t \\in \\mathbb{R}\\) has trace equal to the line \\(y = x\\), but the parametrization carries additional information (the velocity vanishes at \\(t = 0\\)).</p>
    </div>
</div>

<h3>Regular Curves</h3>

<div class="env-block definition">
    <div class="env-title">Definition 0.2 (Regular Curve)</div>
    <div class="env-body">
        <p>A parametrized curve \\(\\alpha: I \\to \\mathbb{R}^n\\) is <strong>regular</strong> if \\(\\alpha'(t) \\neq 0\\) for all \\(t \\in I\\). That is, the velocity vector never vanishes.</p>
    </div>
</div>

<p>Regularity rules out cusps and "stalling points." It ensures the curve has a well-defined tangent direction at every point.</p>

<div class="env-block example">
    <div class="env-title">Example: A Non-Regular Curve</div>
    <div class="env-body">
        <p>The curve \\(\\alpha(t) = (t^3, t^2)\\) has \\(\\alpha'(t) = (3t^2, 2t)\\), so \\(\\alpha'(0) = (0, 0)\\). At \\(t = 0\\) the velocity vanishes, and the trace has a cusp at the origin. This curve is not regular.</p>
    </div>
</div>

<h3>Reparametrization</h3>

<div class="env-block definition">
    <div class="env-title">Definition 0.3 (Reparametrization)</div>
    <div class="env-body">
        <p>Let \\(\\alpha: I \\to \\mathbb{R}^n\\) be a parametrized curve. A <strong>reparametrization</strong> of \\(\\alpha\\) is a curve \\(\\beta = \\alpha \\circ h\\), where \\(h: J \\to I\\) is a smooth map with \\(h'(s) \\neq 0\\) for all \\(s \\in J\\). If \\(h' > 0\\) everywhere, the reparametrization is <strong>orientation-preserving</strong>; if \\(h' < 0\\), it is <strong>orientation-reversing</strong>.</p>
    </div>
</div>

<p>Reparametrization changes the "speed" along the curve but not the trace. It is the fundamental equivalence relation on parametrized curves: two curves are "geometrically the same" if one is a reparametrization of the other.</p>

<div class="viz-placeholder" data-viz="viz-reparametrization"></div>
`,
            visualizations: [
                {
                    id: 'viz-reparametrization',
                    title: 'Reparametrization: Same Curve, Different Speeds',
                    description: 'Two parametrizations of the same curve. The top uses constant speed; the bottom accelerates through the first half. Tangent vectors change length but not direction. Press Play to compare.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 50
                        });

                        var playing = false;
                        var tNorm = 0;

                        // curve: an ellipse
                        function curvePos(t) {
                            return [2 * Math.cos(t), Math.sin(t)];
                        }
                        function curveDeriv(t) {
                            return [-2 * Math.sin(t), Math.cos(t)];
                        }

                        // reparametrization: h(s) = s^2 / (2*pi), so speed varies
                        var tMaxVal = 2 * Math.PI;
                        function reparam(s) {
                            // quadratic reparametrization: slow at start, fast at end
                            return tMaxVal * (s / tMaxVal) * (s / tMaxVal);
                        }
                        function reparamDeriv(s) {
                            return 2 * s / tMaxVal;
                        }

                        var playBtn = VizEngine.createButton(controls, 'Play', function() {
                            if (playing) { playing = false; playBtn.textContent = 'Play'; return; }
                            playing = true; playBtn.textContent = 'Pause'; tNorm = 0;
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            tNorm = 0; playing = false; playBtn.textContent = 'Play';
                        });

                        function drawCurveRow(yOff, t, label, derivScale) {
                            var ctx = viz.ctx;
                            // draw full ellipse
                            ctx.strokeStyle = viz.colors.blue + '33';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            for (var i = 0; i <= 200; i++) {
                                var tt = tMaxVal * i / 200;
                                var p = curvePos(tt);
                                var sx = viz.originX + p[0] * viz.scale;
                                var sy = yOff - p[1] * viz.scale;
                                if (i === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // traced portion
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var steps = Math.max(2, Math.floor(t / tMaxVal * 200));
                            for (var j = 0; j <= steps; j++) {
                                var tt2 = t * j / steps;
                                var p2 = curvePos(tt2);
                                var sx2 = viz.originX + p2[0] * viz.scale;
                                var sy2 = yOff - p2[1] * viz.scale;
                                if (j === 0) ctx.moveTo(sx2, sy2);
                                else ctx.lineTo(sx2, sy2);
                            }
                            ctx.stroke();

                            // point and tangent
                            var pos = curvePos(t);
                            var deriv = curveDeriv(t);
                            var px = viz.originX + pos[0] * viz.scale;
                            var py = yOff - pos[1] * viz.scale;

                            // tangent arrow
                            var arrowLen = derivScale * viz.scale * 0.6;
                            var dlen = Math.sqrt(deriv[0] * deriv[0] + deriv[1] * deriv[1]);
                            if (dlen > 0.01) {
                                var ux = deriv[0] / dlen, uy = deriv[1] / dlen;
                                var ax = px + ux * arrowLen;
                                var ay = py - uy * arrowLen;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(ax, ay); ctx.stroke();
                                // arrowhead
                                var angle = Math.atan2(ay - py, ax - px);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(ax, ay);
                                ctx.lineTo(ax - 10 * Math.cos(angle - 0.4), ay - 10 * Math.sin(angle - 0.4));
                                ctx.lineTo(ax - 10 * Math.cos(angle + 0.4), ay - 10 * Math.sin(angle + 0.4));
                                ctx.closePath(); ctx.fill();
                            }

                            // point
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();

                            // label
                            viz.screenText(label, 50, yOff, viz.colors.text, 11, 'center');
                        }

                        viz.animate(function() {
                            if (playing) {
                                tNorm += 0.012;
                                if (tNorm > 1) { tNorm = 1; playing = false; playBtn.textContent = 'Play'; }
                            }
                            viz.clear();

                            var t1 = tNorm * tMaxVal;  // uniform speed
                            var s = tNorm * tMaxVal;
                            var t2 = reparam(s);        // accelerating

                            drawCurveRow(140, t1, 'Uniform', 1.0);
                            drawCurveRow(290, t2, 'Accelerating', reparamDeriv(s));

                            viz.screenText('Same trace, different parametrizations', viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('t = ' + t1.toFixed(2), viz.width - 60, 140, viz.colors.text, 10);
                            viz.screenText('t = ' + t2.toFixed(2), viz.width - 60, 290, viz.colors.text, 10);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the curve \\(\\alpha(t) = (t^3, t^6)\\) is not regular. Find the point where regularity fails and describe the trace.',
                    hint: 'Compute \\(\\alpha\'(t)\\) and find where it vanishes. What does the trace \\(y = x^2\\) look like?',
                    solution: '\\(\\alpha\'(t) = (3t^2, 6t^5)\\). At \\(t = 0\\), \\(\\alpha\'(0) = (0, 0)\\), so the curve is not regular. The trace is \\(\\{(x, y) : y = x^2, x \\geq 0\\} \\cup \\{(x, y) : y = x^2, x \\leq 0\\}\\), which is just the parabola \\(y = x^2\\). Despite the smooth trace, the parametrization "stalls" at the origin.'
                },
                {
                    question: 'Let \\(\\alpha(t) = (\\cos t, \\sin t)\\) for \\(t \\in (0, 2\\pi)\\) and let \\(h(s) = 2s\\) for \\(s \\in (0, \\pi)\\). Verify that \\(\\beta(s) = \\alpha(h(s))\\) is an orientation-preserving reparametrization. Compute \\(\\beta\'(s)\\) and verify that \\(|\\beta\'(s)| = 2\\).',
                    hint: 'Use the chain rule: \\(\\beta\'(s) = \\alpha\'(h(s)) \\cdot h\'(s)\\).',
                    solution: '\\(h\'(s) = 2 > 0\\) for all \\(s\\), so the reparametrization is orientation-preserving. \\(\\beta(s) = (\\cos 2s, \\sin 2s)\\), so \\(\\beta\'(s) = (-2\\sin 2s, 2\\cos 2s)\\). Then \\(|\\beta\'(s)| = \\sqrt{4\\sin^2 2s + 4\\cos^2 2s} = 2\\). The reparametrized curve moves twice as fast.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Arc Length
        // ================================================================
        {
            id: 'sec-arc-length',
            title: 'Arc Length',
            content: `
<h2>Arc Length</h2>

<div class="env-block intuition">
    <div class="env-title">Measuring Curves</div>
    <div class="env-body">
        <p>How long is a curve? Imagine approximating a curve by a polygonal path (a sequence of straight line segments). As the segments get shorter and more numerous, the total length of the polygonal path converges to a number: the <em>arc length</em> of the curve. This is the integral of the speed.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 0.4 (Arc Length)</div>
    <div class="env-body">
        <p>Let \\(\\alpha: [a, b] \\to \\mathbb{R}^n\\) be a differentiable curve. The <strong>arc length</strong> of \\(\\alpha\\) from \\(t = a\\) to \\(t = b\\) is</p>
        \\[L(\\alpha) = \\int_a^b |\\alpha'(t)|\\, dt = \\int_a^b \\sqrt{\\alpha_1'(t)^2 + \\cdots + \\alpha_n'(t)^2}\\, dt.\\]
    </div>
</div>

<p>The quantity \\(|\\alpha'(t)|\\) is the <strong>speed</strong> of the curve at time \\(t\\). Arc length measures the "distance traveled," regardless of how fast we travel.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.1 (Arc Length Is Invariant Under Reparametrization)</div>
    <div class="env-body">
        <p>If \\(\\beta = \\alpha \\circ h\\) is an orientation-preserving reparametrization of \\(\\alpha\\), then \\(L(\\beta) = L(\\alpha)\\). Arc length depends only on the trace and orientation, not on the parametrization.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>By the chain rule, \\(\\beta'(s) = \\alpha'(h(s)) \\cdot h'(s)\\). Since \\(h' > 0\\),</p>
        \\[|\\beta'(s)| = |\\alpha'(h(s))| \\cdot h'(s).\\]
        <p>Then by the substitution \\(t = h(s)\\):</p>
        \\[L(\\beta) = \\int_{s_0}^{s_1} |\\alpha'(h(s))| \\, h'(s) \\, ds = \\int_{h(s_0)}^{h(s_1)} |\\alpha'(t)|\\, dt = L(\\alpha).\\]
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Arc-Length Parametrization</h3>

<div class="env-block definition">
    <div class="env-title">Definition 0.5 (Arc-Length Parametrization)</div>
    <div class="env-body">
        <p>A parametrized curve \\(\\alpha: I \\to \\mathbb{R}^n\\) is <strong>parametrized by arc length</strong> if \\(|\\alpha'(s)| = 1\\) for all \\(s \\in I\\). Equivalently, the parameter \\(s\\) measures distance traveled along the curve from a fixed starting point.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.2 (Existence of Arc-Length Parametrization)</div>
    <div class="env-body">
        <p>Every regular curve admits a reparametrization by arc length. Specifically, if \\(\\alpha: I \\to \\mathbb{R}^n\\) is regular, define</p>
        \\[s(t) = \\int_{t_0}^{t} |\\alpha'(u)|\\, du.\\]
        <p>Since \\(|\\alpha'| > 0\\), the function \\(s(t)\\) is strictly increasing and hence invertible. The reparametrized curve \\(\\beta(s) = \\alpha(t(s))\\) satisfies \\(|\\beta'(s)| = 1\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Arc-Length Parametrization of the Circle</div>
    <div class="env-body">
        <p>For the circle \\(\\alpha(t) = (r\\cos t, r\\sin t)\\), we have \\(|\\alpha'(t)| = r\\). The arc-length function is \\(s = rt\\), so \\(t = s/r\\). The arc-length parametrization is</p>
        \\[\\beta(s) = \\left(r\\cos\\frac{s}{r},\\, r\\sin\\frac{s}{r}\\right).\\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-arc-length"></div>
`,
            visualizations: [
                {
                    id: 'viz-arc-length',
                    title: 'Arc Length: Equal Intervals vs. Equal Arc Length',
                    description: 'Left: marks at equal parameter intervals (spacing varies with speed). Right: marks at equal arc-length intervals (evenly spaced along the curve). The difference reveals how speed varies.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var nMarks = 10;
                        VizEngine.createSlider(controls, 'Marks', 4, 20, nMarks, 1, function(v) {
                            nMarks = Math.round(v); draw();
                        });

                        // A curve with non-uniform speed: parametrize an ellipse with quadratic speed
                        function curve(t) {
                            // t in [0, 2*pi], non-uniform: use t^1.5 mapping
                            return [2 * Math.cos(t), Math.sin(t)];
                        }
                        function curveDeriv(t) {
                            return [-2 * Math.sin(t), Math.cos(t)];
                        }
                        function speed(t) {
                            var d = curveDeriv(t);
                            return Math.sqrt(d[0] * d[0] + d[1] * d[1]);
                        }

                        // Compute arc length table by numerical integration
                        var tMax = 2 * Math.PI;
                        var arcSteps = 1000;
                        var arcTable = [0]; // arcTable[i] = arc length from 0 to i*dt
                        var dt = tMax / arcSteps;
                        for (var i = 1; i <= arcSteps; i++) {
                            arcTable.push(arcTable[i - 1] + speed((i - 0.5) * dt) * dt);
                        }
                        var totalArc = arcTable[arcSteps];

                        function tFromArc(targetS) {
                            // binary search in arcTable
                            var lo = 0, hi = arcSteps;
                            while (hi - lo > 1) {
                                var mid = (lo + hi) >> 1;
                                if (arcTable[mid] < targetS) lo = mid; else hi = mid;
                            }
                            var frac = (targetS - arcTable[lo]) / (arcTable[hi] - arcTable[lo] || 1);
                            return (lo + frac) * dt;
                        }

                        function drawPanel(cx, cy, title, getT) {
                            var ctx = viz.ctx;
                            var pScale = 55;
                            // draw ellipse
                            ctx.strokeStyle = viz.colors.blue + '55';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 200; i++) {
                                var t = tMax * i / 200;
                                var p = curve(t);
                                var sx = cx + p[0] * pScale;
                                var sy = cy - p[1] * pScale;
                                if (i === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // draw marks
                            for (var k = 0; k < nMarks; k++) {
                                var t2 = getT(k);
                                var p2 = curve(t2);
                                var sx2 = cx + p2[0] * pScale;
                                var sy2 = cy - p2[1] * pScale;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(sx2, sy2, 4, 0, Math.PI * 2); ctx.fill();
                            }

                            viz.screenText(title, cx, cy + 90, viz.colors.text, 11);
                        }

                        function draw() {
                            viz.clear();
                            viz.screenText('Arc Length: Parameter Intervals vs. Arc-Length Intervals', viz.width / 2, 18, viz.colors.white, 13);

                            // Left: equal parameter intervals
                            drawPanel(150, 200, 'Equal parameter intervals', function(k) {
                                return tMax * k / nMarks;
                            });

                            // Right: equal arc-length intervals
                            drawPanel(410, 200, 'Equal arc-length intervals', function(k) {
                                return tFromArc(totalArc * k / nMarks);
                            });
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the arc length of the helix \\(\\alpha(t) = (a\\cos t, a\\sin t, bt)\\) for \\(t \\in [0, 2\\pi]\\).',
                    hint: 'Compute \\(|\\alpha\'(t)|\\) first. The speed should be constant.',
                    solution: '\\(\\alpha\'(t) = (-a\\sin t, a\\cos t, b)\\), so \\(|\\alpha\'(t)| = \\sqrt{a^2 \\sin^2 t + a^2 \\cos^2 t + b^2} = \\sqrt{a^2 + b^2}\\). The arc length is \\(L = \\int_0^{2\\pi} \\sqrt{a^2 + b^2}\\, dt = 2\\pi\\sqrt{a^2 + b^2}\\).'
                },
                {
                    question: 'Find the arc-length parametrization of the helix \\(\\alpha(t) = (\\cos t, \\sin t, t)\\).',
                    hint: 'The speed is constant, so \\(s = ct\\) for some constant \\(c\\).',
                    solution: '\\(|\\alpha\'(t)| = \\sqrt{\\sin^2 t + \\cos^2 t + 1} = \\sqrt{2}\\). So \\(s = \\sqrt{2}\\, t\\), giving \\(t = s/\\sqrt{2}\\). The arc-length parametrization is \\(\\beta(s) = \\left(\\cos\\frac{s}{\\sqrt{2}},\\, \\sin\\frac{s}{\\sqrt{2}},\\, \\frac{s}{\\sqrt{2}}\\right)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Examples
        // ================================================================
        {
            id: 'sec-examples',
            title: 'Examples',
            content: `
<h2>A Gallery of Curves</h2>

<p>We now examine several important families of curves in detail. Each illustrates different aspects of the theory.</p>

<h3>The Circle</h3>

<p>The unit circle \\(\\alpha(t) = (\\cos t, \\sin t)\\) is the most fundamental curve. It is regular (\\(|\\alpha'(t)| = 1\\) for all \\(t\\)), closed (\\(\\alpha(0) = \\alpha(2\\pi)\\)), and already parametrized by arc length. Its curvature is \\(\\kappa = 1\\) everywhere.</p>

<p>More generally, a circle of radius \\(r\\) centered at the origin is \\(\\alpha(t) = (r\\cos t, r\\sin t)\\), with speed \\(|\\alpha'| = r\\) and curvature \\(\\kappa = 1/r\\). Larger circles are "less curved."</p>

<h3>The Helix</h3>

<div class="env-block definition">
    <div class="env-title">Definition 0.6 (Circular Helix)</div>
    <div class="env-body">
        <p>The <strong>circular helix</strong> with radius \\(a > 0\\) and pitch \\(b\\) is the space curve</p>
        \\[\\alpha(t) = (a\\cos t,\\, a\\sin t,\\, bt), \\quad t \\in \\mathbb{R}.\\]
        <p>When \\(b > 0\\), the helix rises; when \\(b < 0\\), it descends. The <strong>pitch angle</strong> \\(\\theta\\) satisfies \\(\\tan\\theta = b/a\\).</p>
    </div>
</div>

<p>The helix is the unique curve (up to rigid motions) with both constant curvature and constant torsion. We will prove this in Chapter 2 when we study the Frenet-Serret frame.</p>

<h3>The Cycloid</h3>

<p>The <strong>cycloid</strong> is the curve traced by a point on the rim of a circle of radius \\(r\\) rolling along the \\(x\\)-axis:</p>
\\[\\alpha(t) = (r(t - \\sin t),\\, r(1 - \\cos t)).\\]

<p>At \\(t = 2k\\pi\\) (integer \\(k\\)), the point touches the ground, and we have \\(\\alpha'(t) = (0, 0)\\), so the cycloid is not regular at these cusps. Between cusps, the cycloid is regular and has remarkable properties:</p>

<ul>
    <li><strong>Brachistochrone:</strong> Among all smooth curves connecting two points in a vertical plane, the cycloid is the curve of fastest descent under gravity (Johann Bernoulli, 1696).</li>
    <li><strong>Tautochrone:</strong> A ball released from any point on a cycloidal track arrives at the bottom in the same time, regardless of starting position (Huygens, 1673).</li>
</ul>

<h3>Lissajous Curves</h3>

<p><strong>Lissajous curves</strong> (or Lissajous figures) are parametrized by</p>
\\[\\alpha(t) = (A\\sin(at + \\delta),\\, B\\sin(bt)), \\quad t \\in [0, 2\\pi].\\]

<p>When \\(a/b\\) is rational, the curve is closed. The shape depends on the frequency ratio \\(a:b\\) and the phase shift \\(\\delta\\). These curves appear in oscilloscope displays when two periodic signals are combined.</p>

<div class="viz-placeholder" data-viz="viz-helix-3d"></div>
<div class="viz-placeholder" data-viz="viz-plane-curves-gallery"></div>
`,
            visualizations: [
                {
                    id: 'viz-helix-3d',
                    title: '3D Helix with Oblique Projection',
                    description: 'A circular helix projected into 2D using an oblique (cabinet) projection. Adjust the radius and pitch to see how the helix shape changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 340, scale: 50
                        });

                        var radius = 1.5;
                        var pitch = 0.4;
                        var animAngle = 0;

                        VizEngine.createSlider(controls, 'Radius a', 0.5, 3.0, radius, 0.1, function(v) { radius = v; });
                        VizEngine.createSlider(controls, 'Pitch b', 0.1, 1.5, pitch, 0.1, function(v) { pitch = v; });

                        // Oblique projection: (x,y,z) -> (x + 0.35*z, y + 0.35*z)
                        function project(x, y, z) {
                            return [x - 0.35 * z, y + 0.35 * z];
                        }

                        viz.animate(function() {
                            animAngle += 0.005;
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Circular Helix: \u03B1(t) = (a cos t, a sin t, bt)', viz.width / 2, 18, viz.colors.white, 13);

                            // draw 3D axes
                            var axes = [
                                { dir: [1, 0, 0], label: 'x', color: viz.colors.red },
                                { dir: [0, 1, 0], label: 'y', color: viz.colors.green },
                                { dir: [0, 0, 1], label: 'z', color: viz.colors.blue }
                            ];
                            for (var a = 0; a < axes.length; a++) {
                                var ax = axes[a];
                                var p0 = project(0, 0, 0);
                                var p1 = project(ax.dir[0] * 3, ax.dir[2] * 3, ax.dir[1] * 3);
                                var sx0 = viz.originX + p0[0] * viz.scale;
                                var sy0 = viz.originY - p0[1] * viz.scale;
                                var sx1 = viz.originX + p1[0] * viz.scale;
                                var sy1 = viz.originY - p1[1] * viz.scale;
                                ctx.strokeStyle = ax.color + '44';
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(sx0, sy0); ctx.lineTo(sx1, sy1); ctx.stroke();
                                ctx.fillStyle = ax.color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(ax.label, sx1 + 10, sy1);
                            }

                            // draw helix
                            var nTurns = 3;
                            var tMaxH = nTurns * 2 * Math.PI;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 500; i++) {
                                var t = tMaxH * i / 500;
                                var hx = radius * Math.cos(t + animAngle);
                                var hy = radius * Math.sin(t + animAngle);
                                var hz = pitch * t;
                                var pp = project(hx, hz, hy);
                                var ssx = viz.originX + pp[0] * viz.scale;
                                var ssy = viz.originY - pp[1] * viz.scale;
                                if (!started) { ctx.moveTo(ssx, ssy); started = true; }
                                else ctx.lineTo(ssx, ssy);
                            }
                            ctx.stroke();

                            // moving point
                            var tp = (animAngle * 5) % tMaxH;
                            var mx = radius * Math.cos(tp + animAngle);
                            var my = radius * Math.sin(tp + animAngle);
                            var mz = pitch * tp;
                            var mp = project(mx, mz, my);
                            var mpx = viz.originX + mp[0] * viz.scale;
                            var mpy = viz.originY - mp[1] * viz.scale;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(mpx, mpy, 5, 0, Math.PI * 2); ctx.fill();

                            viz.screenText('a = ' + radius.toFixed(1) + ',  b = ' + pitch.toFixed(1), viz.width / 2, viz.height - 14, viz.colors.text, 11);
                        });
                        return viz;
                    }
                },
                {
                    id: 'viz-plane-curves-gallery',
                    title: 'Gallery of Plane Curves',
                    description: 'Click through a gallery of classic plane curves: ellipse, cardioid, Archimedean spiral, and lemniscate of Bernoulli.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 280, originY: 180, scale: 60
                        });

                        var galleryItems = [
                            {
                                name: 'Ellipse',
                                eq: '\u03B1(t) = (2cos t, sin t)',
                                fn: function(t) { return [2 * Math.cos(t), Math.sin(t)]; },
                                tRange: [0, 2 * Math.PI]
                            },
                            {
                                name: 'Cardioid',
                                eq: 'r(\u03B8) = 1 + cos \u03B8',
                                fn: function(t) {
                                    var r = 1 + Math.cos(t);
                                    return [r * Math.cos(t) * 0.8, r * Math.sin(t) * 0.8];
                                },
                                tRange: [0, 2 * Math.PI]
                            },
                            {
                                name: 'Archimedean Spiral',
                                eq: 'r(\u03B8) = 0.15\u03B8',
                                fn: function(t) {
                                    var r = 0.15 * t;
                                    return [r * Math.cos(t), r * Math.sin(t)];
                                },
                                tRange: [0, 6 * Math.PI]
                            },
                            {
                                name: 'Lemniscate of Bernoulli',
                                eq: 'r\u00B2 = 2cos 2\u03B8',
                                fn: function(t) {
                                    var c = Math.cos(2 * t);
                                    if (c < 0) return [NaN, NaN];
                                    var r = Math.sqrt(2 * c) * 1.2;
                                    return [r * Math.cos(t), r * Math.sin(t)];
                                },
                                tRange: [0, 2 * Math.PI]
                            }
                        ];
                        var currentIdx = 0;

                        VizEngine.createButton(controls, '\u25C0 Prev', function() {
                            currentIdx = (currentIdx - 1 + galleryItems.length) % galleryItems.length;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Next \u25B6', function() {
                            currentIdx = (currentIdx + 1) % galleryItems.length;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var item = galleryItems[currentIdx];
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            var steps = 800;
                            for (var i = 0; i <= steps; i++) {
                                var t = item.tRange[0] + (item.tRange[1] - item.tRange[0]) * i / steps;
                                var p = item.fn(t);
                                if (isNaN(p[0]) || isNaN(p[1])) { started = false; continue; }
                                var s = viz.toScreen(p[0], p[1]);
                                if (!started) { ctx.moveTo(s[0], s[1]); started = true; }
                                else ctx.lineTo(s[0], s[1]);
                            }
                            ctx.stroke();

                            viz.screenText(item.name, viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText(item.eq, viz.width / 2, viz.height - 14, viz.colors.text, 11);
                            viz.screenText((currentIdx + 1) + ' / ' + galleryItems.length, viz.width - 40, 18, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the arc length of one arch of the cycloid \\(\\alpha(t) = (t - \\sin t, 1 - \\cos t)\\) for \\(t \\in [0, 2\\pi]\\).',
                    hint: 'Use the identity \\(1 - \\cos t = 2\\sin^2(t/2)\\) to simplify \\(|\\alpha\'(t)|\\).',
                    solution: '\\(\\alpha\'(t) = (1 - \\cos t, \\sin t)\\). So \\(|\\alpha\'(t)|^2 = (1-\\cos t)^2 + \\sin^2 t = 2 - 2\\cos t = 4\\sin^2(t/2)\\). Thus \\(|\\alpha\'(t)| = 2|\\sin(t/2)| = 2\\sin(t/2)\\) for \\(t \\in [0, 2\\pi]\\). The arc length is \\(L = \\int_0^{2\\pi} 2\\sin(t/2)\\, dt = [-4\\cos(t/2)]_0^{2\\pi} = -4(-1) + 4(1) = 8\\).'
                },
                {
                    question: 'Show that a Lissajous curve \\(\\alpha(t) = (\\sin 3t, \\sin 2t)\\) is closed. How many self-intersections does it have?',
                    hint: 'Check that \\(\\alpha(t + 2\\pi) = \\alpha(t)\\). For intersections, find distinct \\(t_1, t_2 \\in [0, 2\\pi)\\) with \\(\\alpha(t_1) = \\alpha(t_2)\\).',
                    solution: 'Since \\(\\sin\\) has period \\(2\\pi\\) and \\(\\text{lcm}\\) of periods \\(2\\pi/3\\) and \\(\\pi\\) is \\(2\\pi\\), the curve is closed with period \\(2\\pi\\). Counting self-intersections: we need \\(\\sin 3t_1 = \\sin 3t_2\\) and \\(\\sin 2t_1 = \\sin 2t_2\\) with \\(t_1 \\neq t_2\\). By systematic enumeration (or plotting), there are 3 self-intersection points.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: The Tangent Vector
        // ================================================================
        {
            id: 'sec-tangent',
            title: 'The Tangent Vector',
            content: `
<h2>The Tangent Vector</h2>

<div class="env-block definition">
    <div class="env-title">Definition 0.7 (Velocity and Tangent Vectors)</div>
    <div class="env-body">
        <p>Let \\(\\alpha: I \\to \\mathbb{R}^n\\) be a parametrized curve. The <strong>velocity vector</strong> (or tangent vector) at \\(t\\) is</p>
        \\[\\alpha'(t) = \\lim_{h \\to 0} \\frac{\\alpha(t + h) - \\alpha(t)}{h}.\\]
        <p>If \\(\\alpha\\) is regular, the <strong>unit tangent vector</strong> is</p>
        \\[T(t) = \\frac{\\alpha'(t)}{|\\alpha'(t)|}.\\]
    </div>
</div>

<p>The velocity vector \\(\\alpha'(t)\\) points in the direction of motion and has magnitude equal to the speed \\(|\\alpha'(t)|\\). The unit tangent vector \\(T(t)\\) retains only the directional information.</p>

<div class="env-block theorem">
    <div class="env-title">Proposition 0.3</div>
    <div class="env-body">
        <p>If \\(\\alpha\\) is parametrized by arc length, then \\(\\alpha'(s) = T(s)\\), the velocity vector is already the unit tangent.</p>
    </div>
</div>

<p>This is one reason arc-length parametrization is so convenient: the derivative <em>is</em> the unit tangent, and the geometry is read directly from the derivatives.</p>

<div class="env-block example">
    <div class="env-title">Example: Tangent to the Helix</div>
    <div class="env-body">
        <p>For the helix \\(\\alpha(t) = (\\cos t, \\sin t, t)\\):</p>
        \\[\\alpha'(t) = (-\\sin t, \\cos t, 1), \\quad |\\alpha'(t)| = \\sqrt{2}.\\]
        <p>The unit tangent is</p>
        \\[T(t) = \\frac{1}{\\sqrt{2}}(-\\sin t, \\cos t, 1).\\]
        <p>Note that \\(T\\) makes a constant angle with the \\(z\\)-axis: \\(\\cos\\theta = T \\cdot e_3 = 1/\\sqrt{2}\\), so \\(\\theta = \\pi/4\\). This is the pitch angle.</p>
    </div>
</div>

<h3>Geometric Interpretation</h3>

<p>The tangent line to \\(\\alpha\\) at \\(t_0\\) is the line through \\(\\alpha(t_0)\\) in the direction \\(\\alpha'(t_0)\\):</p>
\\[\\ell(u) = \\alpha(t_0) + u \\cdot \\alpha'(t_0), \\quad u \\in \\mathbb{R}.\\]

<p>This is the best linear approximation to the curve near \\(t_0\\). For a curve parametrized by arc length, \\(\\alpha(s) \\approx \\alpha(s_0) + (s - s_0) T(s_0)\\) for \\(s\\) near \\(s_0\\).</p>

<div class="viz-placeholder" data-viz="viz-tangent-vector"></div>
`,
            visualizations: [
                {
                    id: 'viz-tangent-vector',
                    title: 'Tangent Vector on a Curve',
                    description: 'Drag the point along the curve to see how the tangent vector changes. Toggle between 2D (ellipse) and 3D (helix, projected). The tangent arrow shows the direction and magnitude of the velocity.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 60
                        });

                        var mode = '2D';
                        var tVal = 0.5;

                        var modeBtn = VizEngine.createButton(controls, '2D / 3D', function() {
                            mode = (mode === '2D') ? '3D' : '2D';
                            draw();
                        });
                        VizEngine.createSlider(controls, 't', 0, 6.28, tVal, 0.05, function(v) {
                            tVal = v; draw();
                        });

                        function curve2D(t) { return [2 * Math.cos(t), Math.sin(t)]; }
                        function deriv2D(t) { return [-2 * Math.sin(t), Math.cos(t)]; }

                        function curve3D(t) {
                            var x = 1.5 * Math.cos(t), y = 1.5 * Math.sin(t), z = 0.3 * t;
                            return [x - 0.3 * y, z - 0.15 * x + 0.4 * y];
                        }
                        function deriv3D(t) {
                            var dx = -1.5 * Math.sin(t), dy = 1.5 * Math.cos(t), dz = 0.3;
                            return [dx - 0.3 * dy, dz - 0.15 * dx + 0.4 * dy];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var curveFn = mode === '2D' ? curve2D : curve3D;
                            var derivFn = mode === '2D' ? deriv2D : deriv3D;
                            var tMaxV = mode === '2D' ? 2 * Math.PI : 4 * Math.PI;
                            var ctx = viz.ctx;

                            // draw curve
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 400; i++) {
                                var t = tMaxV * i / 400;
                                var p = curveFn(t);
                                var s = viz.toScreen(p[0], p[1]);
                                if (!started) { ctx.moveTo(s[0], s[1]); started = true; }
                                else ctx.lineTo(s[0], s[1]);
                            }
                            ctx.stroke();

                            // tangent vector at tVal
                            var pt = curveFn(tVal);
                            var dv = derivFn(tVal);
                            var scale = 0.7;
                            viz.drawVector(pt[0], pt[1], pt[0] + dv[0] * scale, pt[1] + dv[1] * scale, viz.colors.orange, "T", 2);
                            viz.drawPoint(pt[0], pt[1], viz.colors.orange, null, 6);

                            // tangent line (dashed)
                            var len = 3;
                            var dlen = Math.sqrt(dv[0] * dv[0] + dv[1] * dv[1]);
                            if (dlen > 0.01) {
                                var ux = dv[0] / dlen, uy = dv[1] / dlen;
                                viz.drawSegment(pt[0] - ux * len, pt[1] - uy * len, pt[0] + ux * len, pt[1] + uy * len, viz.colors.orange + '44', 1, true);
                            }

                            var label = mode === '2D' ? 'Ellipse: \u03B1(t) = (2cos t, sin t)' : 'Helix (projected)';
                            viz.screenText(label, viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('t = ' + tVal.toFixed(2) + '   ||\u03B1\'|| = ' + dlen.toFixed(2), viz.width / 2, viz.height - 14, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(\\alpha(t) = (e^t \\cos t, e^t \\sin t)\\), a logarithmic spiral. Compute \\(\\alpha\'(t)\\), \\(|\\alpha\'(t)|\\), and \\(T(t)\\). Show that the angle between \\(\\alpha\'(t)\\) and the position vector \\(\\alpha(t)\\) is constant.',
                    hint: 'Use the product rule. For the angle, compute \\(\\cos\\theta = \\frac{\\alpha(t) \\cdot \\alpha\'(t)}{|\\alpha(t)||\\alpha\'(t)|}\\).',
                    solution: '\\(\\alpha\'(t) = (e^t(\\cos t - \\sin t), e^t(\\sin t + \\cos t))\\). \\(|\\alpha\'(t)| = e^t\\sqrt{2}\\). \\(T(t) = \\frac{1}{\\sqrt{2}}(\\cos t - \\sin t, \\sin t + \\cos t)\\). The dot product \\(\\alpha(t) \\cdot \\alpha\'(t) = e^{2t}(\\cos t(\\cos t - \\sin t) + \\sin t(\\sin t + \\cos t)) = e^{2t}\\). Since \\(|\\alpha(t)| = e^t\\) and \\(|\\alpha\'(t)| = e^t\\sqrt{2}\\), we get \\(\\cos\\theta = e^{2t}/(e^t \\cdot e^t\\sqrt{2}) = 1/\\sqrt{2}\\), so \\(\\theta = \\pi/4\\) always.'
                },
                {
                    question: 'For a curve parametrized by arc length, prove that \\(T\'(s) \\perp T(s)\\). That is, the derivative of the unit tangent is perpendicular to the unit tangent.',
                    hint: 'Differentiate \\(T(s) \\cdot T(s) = 1\\).',
                    solution: 'Since \\(|T(s)|^2 = T(s) \\cdot T(s) = 1\\) for all \\(s\\), differentiate both sides: \\(2\\, T\'(s) \\cdot T(s) = 0\\), so \\(T\'(s) \\perp T(s)\\). This is the key fact that enables the definition of curvature: \\(T\'\\) points "sideways," measuring how the tangent direction rotates.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Plane Curves
        // ================================================================
        {
            id: 'sec-plane-curves',
            title: 'Plane Curves',
            content: `
<h2>Plane Curves: Curvature Preview and Winding</h2>

<p>For curves in \\(\\mathbb{R}^2\\), there is a richer structure than in higher dimensions: we can assign a <em>sign</em> to the curvature.</p>

<h3>Signed Curvature</h3>

<div class="env-block definition">
    <div class="env-title">Definition 0.8 (Signed Curvature of a Plane Curve)</div>
    <div class="env-body">
        <p>Let \\(\\alpha: I \\to \\mathbb{R}^2\\) be a regular curve parametrized by arc length. Write \\(T(s) = (\\cos\\theta(s), \\sin\\theta(s))\\) where \\(\\theta(s)\\) is the angle \\(T\\) makes with the positive \\(x\\)-axis. The <strong>signed curvature</strong> (or simply curvature, for plane curves) is</p>
        \\[\\kappa(s) = \\theta'(s) = \\frac{d\\theta}{ds}.\\]
    </div>
</div>

<p>The signed curvature \\(\\kappa\\) is positive when the curve turns left (counterclockwise) and negative when it turns right (clockwise). Its absolute value \\(|\\kappa|\\) is the rate of change of direction per unit arc length.</p>

<div class="env-block theorem">
    <div class="env-title">Proposition 0.4 (Curvature Formula for Plane Curves)</div>
    <div class="env-body">
        <p>For a regular plane curve \\(\\alpha(t) = (x(t), y(t))\\) (not necessarily arc-length parametrized), the signed curvature is</p>
        \\[\\kappa(t) = \\frac{x'y'' - x''y'}{(x'^2 + y'^2)^{3/2}}.\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Curvature of a Circle</div>
    <div class="env-body">
        <p>For the circle \\(\\alpha(t) = (r\\cos t, r\\sin t)\\): \\(x' = -r\\sin t\\), \\(y' = r\\cos t\\), \\(x'' = -r\\cos t\\), \\(y'' = -r\\sin t\\).</p>
        \\[\\kappa = \\frac{(-r\\sin t)(-r\\sin t) - (-r\\cos t)(r\\cos t)}{r^3} = \\frac{r^2}{r^3} = \\frac{1}{r}.\\]
        <p>The curvature is constant and equal to the reciprocal of the radius, as expected.</p>
    </div>
</div>

<h3>The Winding Number</h3>

<p>For a closed plane curve, the <strong>total curvature</strong> is</p>
\\[\\int_0^L \\kappa(s)\\, ds = \\theta(L) - \\theta(0) = 2\\pi \\cdot (\\text{winding number}).\\]

<p>The winding number counts how many times the tangent vector rotates as we traverse the curve. For a simple (non-self-intersecting) closed curve, the winding number is \\(\\pm 1\\), a fact closely related to the Jordan Curve Theorem.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.3 (Rotation Index / Umlaufsatz)</div>
    <div class="env-body">
        <p>Let \\(\\alpha: [0, L] \\to \\mathbb{R}^2\\) be a regular, simple, closed curve parametrized by arc length. Then</p>
        \\[\\int_0^L \\kappa(s)\\, ds = \\pm 2\\pi.\\]
        <p>The sign depends on the orientation: \\(+2\\pi\\) for counterclockwise, \\(-2\\pi\\) for clockwise.</p>
    </div>
</div>

<p>This is a remarkable result: no matter how complicated the shape of the curve, as long as it is simple and closed, the total curvature is always \\(\\pm 2\\pi\\). This is a precursor to the Gauss-Bonnet theorem (Chapter 9), one of the deepest results in differential geometry.</p>

<div class="viz-placeholder" data-viz="viz-speed-vs-arclength"></div>
`,
            visualizations: [
                {
                    id: 'viz-speed-vs-arclength',
                    title: 'Speed vs. Arc-Length Parametrization',
                    description: 'Top: a curve traversed with variable speed. Bottom: the same curve reparametrized by arc length (unit speed). The tangent vectors on the bottom all have the same length.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var playing = false;
                        var tNorm = 0;
                        var nArrows = 8;

                        VizEngine.createSlider(controls, 'Arrows', 4, 16, nArrows, 1, function(v) { nArrows = Math.round(v); });

                        var playBtn = VizEngine.createButton(controls, 'Play', function() {
                            if (playing) { playing = false; playBtn.textContent = 'Play'; return; }
                            playing = true; playBtn.textContent = 'Pause'; tNorm = 0;
                        });

                        // Non-uniform-speed curve: an ellipse with quadratic parameter
                        var tMaxP = 2 * Math.PI;
                        function curveRaw(t) { return [2 * Math.cos(t), Math.sin(t)]; }
                        function derivRaw(t) { return [-2 * Math.sin(t), Math.cos(t)]; }
                        function speedRaw(t) {
                            var d = derivRaw(t);
                            return Math.sqrt(d[0] * d[0] + d[1] * d[1]);
                        }

                        // Build arc-length table
                        var arcN = 1000;
                        var arcTab = [0];
                        var dtArc = tMaxP / arcN;
                        for (var ii = 1; ii <= arcN; ii++) {
                            arcTab.push(arcTab[ii - 1] + speedRaw((ii - 0.5) * dtArc) * dtArc);
                        }
                        var totalArcLen = arcTab[arcN];

                        function tFromArcLen(s) {
                            var lo = 0, hi = arcN;
                            while (hi - lo > 1) {
                                var mid = (lo + hi) >> 1;
                                if (arcTab[mid] < s) lo = mid; else hi = mid;
                            }
                            var frac = (s - arcTab[lo]) / (arcTab[hi] - arcTab[lo] || 1);
                            return (lo + frac) * dtArc;
                        }

                        function drawRow(cx, cy, scl, label, getT, getDeriv) {
                            var ctx = viz.ctx;
                            // full curve
                            ctx.strokeStyle = viz.colors.blue + '44';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 200; i++) {
                                var t = tMaxP * i / 200;
                                var p = curveRaw(t);
                                var sx = cx + p[0] * scl;
                                var sy = cy - p[1] * scl;
                                if (i === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // arrows at nArrows points
                            for (var k = 0; k < nArrows; k++) {
                                var frac = k / nArrows;
                                var t2 = getT(frac);
                                var d2 = getDeriv(frac);
                                var p2 = curveRaw(t2);
                                var px = cx + p2[0] * scl;
                                var py = cy - p2[1] * scl;

                                var arrowScale = 18;
                                var dl = Math.sqrt(d2[0] * d2[0] + d2[1] * d2[1]);
                                if (dl < 0.01) continue;
                                var ax = px + (d2[0] / dl) * dl * arrowScale * 0.5;
                                var ay = py - (d2[1] / dl) * dl * arrowScale * 0.5;

                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(ax, ay); ctx.stroke();
                                var angle = Math.atan2(ay - py, ax - px);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(ax, ay);
                                ctx.lineTo(ax - 8 * Math.cos(angle - 0.4), ay - 8 * Math.sin(angle - 0.4));
                                ctx.lineTo(ax - 8 * Math.cos(angle + 0.4), ay - 8 * Math.sin(angle + 0.4));
                                ctx.closePath(); ctx.fill();

                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
                            }

                            viz.screenText(label, 50, cy, viz.colors.text, 11, 'center');
                        }

                        viz.animate(function() {
                            if (playing) {
                                tNorm += 0.005;
                                if (tNorm > 1) { tNorm = 1; playing = false; playBtn.textContent = 'Play'; }
                            }
                            viz.clear();
                            viz.screenText('Variable Speed vs. Unit Speed', viz.width / 2, 18, viz.colors.white, 13);

                            // Top row: non-uniform speed (quadratic reparametrization)
                            drawRow(280, 130, 55, 'Variable speed', function(frac) {
                                // quadratic: slow at start, fast at end
                                return tMaxP * frac * frac;
                            }, function(frac) {
                                var t = tMaxP * frac * frac;
                                var d = derivRaw(t);
                                var h = 2 * frac * tMaxP; // dh/dfrac
                                return [d[0] * h / tMaxP, d[1] * h / tMaxP];
                            });

                            // Bottom row: arc-length (unit speed)
                            drawRow(280, 300, 55, 'Unit speed', function(frac) {
                                return tFromArcLen(frac * totalArcLen);
                            }, function(frac) {
                                var t = tFromArcLen(frac * totalArcLen);
                                var d = derivRaw(t);
                                var sp = speedRaw(t);
                                return [d[0] / sp, d[1] / sp];
                            });
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the signed curvature of the parabola \\(\\alpha(t) = (t, t^2)\\). At what point is the curvature maximal?',
                    hint: 'Use the formula \\(\\kappa = \\frac{x\'y\'\' - x\'\'y\'}{(x\'^2 + y\'^2)^{3/2}}\\).',
                    solution: '\\(x\' = 1, y\' = 2t, x\'\' = 0, y\'\' = 2\\). So \\(\\kappa(t) = \\frac{1 \\cdot 2 - 0 \\cdot 2t}{(1 + 4t^2)^{3/2}} = \\frac{2}{(1 + 4t^2)^{3/2}}\\). This is maximized at \\(t = 0\\), where \\(\\kappa(0) = 2\\). The vertex of the parabola is the point of maximum curvature.'
                },
                {
                    question: 'Verify the Umlaufsatz for the ellipse \\(\\alpha(t) = (a\\cos t, b\\sin t)\\), \\(t \\in [0, 2\\pi]\\), by computing \\(\\int_0^{2\\pi} \\kappa(t)|\\alpha\'(t)|\\, dt\\).',
                    hint: 'Use \\(\\kappa |\\alpha\'| = \\frac{x\'y\'\' - x\'\'y\'}{x\'^2 + y\'^2}\\). Then integrate.',
                    solution: 'We have \\(x\' = -a\\sin t, y\' = b\\cos t, x\'\' = -a\\cos t, y\'\' = -b\\sin t\\). So \\(x\'y\'\' - x\'\'y\' = ab\\sin^2 t + ab\\cos^2 t = ab\\). And \\(x\'^2 + y\'^2 = a^2\\sin^2 t + b^2\\cos^2 t\\). Thus \\(\\int_0^{2\\pi} \\frac{ab}{a^2\\sin^2 t + b^2\\cos^2 t}\\, dt\\). By the standard integral \\(\\int_0^{2\\pi} \\frac{dt}{A\\sin^2 t + B\\cos^2 t} = \\frac{2\\pi}{\\sqrt{AB}}\\), this gives \\(ab \\cdot \\frac{2\\pi}{ab} = 2\\pi\\). The total curvature is \\(2\\pi\\), confirming the Umlaufsatz.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Chapter 1
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'What Comes Next',
            content: `
<h2>From Curves to Curvature and Torsion</h2>

<p>In this chapter we have established the language of parametrized curves: how to describe them (parametrizations), how to measure them (arc length), and how to analyze their local behavior (tangent vectors and curvature).</p>

<h3>Summary: The Curve Toolkit</h3>

<table style="width:100%; border-collapse:collapse; margin:16px 0; font-size:0.92em;">
    <tr style="border-bottom:2px solid var(--border-default);">
        <th style="padding:8px; text-align:left;">Concept</th>
        <th style="padding:8px; text-align:center;">Formula</th>
        <th style="padding:8px; text-align:left;">Meaning</th>
    </tr>
    <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:8px;">Parametrized curve</td>
        <td style="padding:8px; text-align:center;">\\(\\alpha: I \\to \\mathbb{R}^n\\)</td>
        <td style="padding:8px;">Smooth map from interval to space</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:8px;">Regular curve</td>
        <td style="padding:8px; text-align:center;">\\(\\alpha'(t) \\neq 0\\)</td>
        <td style="padding:8px;">Velocity never vanishes</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:8px;">Arc length</td>
        <td style="padding:8px; text-align:center;">\\(s = \\int |\\alpha'|\\, dt\\)</td>
        <td style="padding:8px;">Distance traveled along curve</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:8px;">Unit tangent</td>
        <td style="padding:8px; text-align:center;">\\(T = \\alpha'/|\\alpha'|\\)</td>
        <td style="padding:8px;">Direction of motion</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:8px;">Signed curvature (2D)</td>
        <td style="padding:8px; text-align:center;">\\(\\kappa = \\frac{x'y'' - x''y'}{(x'^2 + y'^2)^{3/2}}\\)</td>
        <td style="padding:8px;">Rate of turning</td>
    </tr>
    <tr>
        <td style="padding:8px;">Reparametrization</td>
        <td style="padding:8px; text-align:center;">\\(\\beta = \\alpha \\circ h\\)</td>
        <td style="padding:8px;">Same trace, different speed</td>
    </tr>
</table>

<div class="env-block remark">
    <div class="env-title">Looking Ahead</div>
    <div class="env-body">
        <p>We have only scratched the surface. Several natural questions remain:</p>
        <ul>
            <li>For space curves in \\(\\mathbb{R}^3\\), the tangent vector alone does not capture all the geometry. The curve can also <em>twist</em> out of a plane, measured by a quantity called <strong>torsion</strong> \\(\\tau\\). Chapter 1 develops curvature and torsion in full.</li>
            <li>The tangent vector \\(T\\) is the first element of an orthonormal frame \\(\\{T, N, B\\}\\) that moves along the curve, the <strong>Frenet-Serret frame</strong>. The differential equations governing this frame (Chapter 2) completely determine a curve up to rigid motions.</li>
            <li>Everything we do for curves foreshadows the study of surfaces. The tangent vector becomes the tangent plane; curvature becomes Gaussian and mean curvature; arc length becomes the first fundamental form.</li>
        </ul>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">What Comes Next</div>
    <div class="env-body">
        <p>In <strong>Chapter 1</strong>, we define curvature \\(\\kappa\\) and torsion \\(\\tau\\) for space curves, prove the fundamental theorem of curves (a curve is determined up to rigid motion by its curvature and torsion), and compute these invariants for several important families of curves.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(\\alpha: [0, L] \\to \\mathbb{R}^2\\) be a regular closed curve parametrized by arc length. Prove that \\(\\int_0^L T(s)\\, ds = 0\\).',
                    hint: 'Since \\(\\alpha\\) is closed, \\(\\alpha(L) = \\alpha(0)\\). Use \\(T(s) = \\alpha\'(s)\\) and the fundamental theorem of calculus.',
                    solution: '\\(\\int_0^L T(s)\\, ds = \\int_0^L \\alpha\'(s)\\, ds = \\alpha(L) - \\alpha(0) = 0\\), since the curve is closed. Geometrically, the tangent vectors "cancel out" over a full traversal.'
                },
                {
                    question: 'A curve \\(\\alpha(t) = (f(t), g(t))\\) has constant speed \\(v > 0\\) and constant signed curvature \\(\\kappa_0 > 0\\). Show that the trace of \\(\\alpha\\) is a circle of radius \\(1/\\kappa_0\\).',
                    hint: 'Constant speed means \\(|\\alpha\'| = v\\), so \\(s = vt\\). Constant curvature means \\(\\theta(s) = \\kappa_0 s + \\theta_0\\). Integrate \\(T(s) = (\\cos\\theta, \\sin\\theta)\\) to find \\(\\alpha\\).',
                    solution: 'Since \\(\\theta(s) = \\kappa_0 s + \\theta_0\\), we have \\(T(s) = (\\cos(\\kappa_0 s + \\theta_0), \\sin(\\kappa_0 s + \\theta_0))\\). Integrating: \\(\\alpha(s) = \\left(\\frac{1}{\\kappa_0}\\sin(\\kappa_0 s + \\theta_0) + c_1,\\, -\\frac{1}{\\kappa_0}\\cos(\\kappa_0 s + \\theta_0) + c_2\\right)\\). This is a circle of radius \\(R = 1/\\kappa_0\\) centered at \\((c_1, c_2)\\).'
                }
            ]
        }
    ]
});
