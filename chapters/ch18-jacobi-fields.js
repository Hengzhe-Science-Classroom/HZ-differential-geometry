window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch18',
    number: 18,
    title: 'Jacobi Fields & Conjugate Points',
    subtitle: 'How nearby geodesics spread apart or converge',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Study Nearby Geodesics?</h2>

<div class="env-block intuition">
    <div class="env-title">The Core Question</div>
    <div class="env-body">
        <p>Geodesics are the "straight lines" of curved spaces. But how do <em>neighboring</em> geodesics behave? On a flat plane, parallel lines stay parallel forever. On a sphere, great circles starting from the same point reconverge at the antipodal point. In hyperbolic space, geodesics from the same point spread apart exponentially. These behaviors encode the curvature of the space.</p>
    </div>
</div>

<p>We have spent the previous chapters building the machinery of Riemannian geometry: metrics (Ch 14), connections (Ch 15), geodesics and the exponential map (Ch 16), and curvature tensors (Ch 17). Now we bring all of these tools together to answer a fundamental question:</p>

<p><strong>Given a geodesic \\(\\gamma\\), how do infinitesimally nearby geodesics deviate from \\(\\gamma\\)?</strong></p>

<p>The answer is a <em>Jacobi field</em>: a vector field along \\(\\gamma\\) that satisfies a second-order ODE involving the curvature tensor. This single equation connects three deep themes:</p>

<ol>
    <li><strong>Calculus of variations:</strong> Jacobi fields arise as the first-order variation of a one-parameter family of geodesics.</li>
    <li><strong>Minimality of geodesics:</strong> A geodesic stops being a length-minimizer exactly when a Jacobi field vanishes again (a <em>conjugate point</em>).</li>
    <li><strong>Global topology:</strong> The sign of curvature controls whether Jacobi fields oscillate (positive curvature) or grow (negative curvature), leading to the Bonnet-Myers and Cartan-Hadamard theorems.</li>
</ol>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Carl Gustav Jacob Jacobi studied the second variation of the length functional in the 1830s. His analysis of when a geodesic ceases to minimize length introduced what we now call Jacobi fields and conjugate points. This work predates Riemann's 1854 lecture on the foundations of geometry; Jacobi was working in the Euler-Lagrange calculus of variations tradition.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-jacobi-field"></div>
`,
            visualizations: [
                {
                    id: 'viz-jacobi-field',
                    title: 'Jacobi Field as Geodesic Variation',
                    description: 'A family of geodesics emanating from a common point. The Jacobi field \\(J(t)\\) is the variation vector connecting corresponding points on neighboring geodesics. On the sphere (positive curvature), geodesics reconverge. In hyperbolic space (negative curvature), they spread apart.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 360, scale: 60
                        });

                        var curvature = 1.0;
                        var time = 0;
                        VizEngine.createSlider(controls, 'Curvature K', -2, 2, curvature, 0.1, function(v) {
                            curvature = v;
                        });

                        viz.animate(function(t) {
                            time = (t % 8000) / 8000;
                            viz.clear();
                            var ctx = viz.ctx;

                            var K = curvature;
                            var numGeodesics = 9;
                            var spreadAngle = Math.PI / 6;
                            var tMax = 4.5;
                            var animT = time * tMax;

                            // Title
                            var label = K > 0.01 ? 'Positive curvature (K=' + K.toFixed(1) + '): geodesics converge'
                                      : K < -0.01 ? 'Negative curvature (K=' + K.toFixed(1) + '): geodesics diverge'
                                      : 'Zero curvature: geodesics stay parallel';
                            viz.screenText(label, viz.width / 2, 20, viz.colors.white, 13);

                            // Draw geodesics as curves from the origin
                            // In constant curvature K, the Jacobi field magnitude is:
                            // K>0: J(t) = sin(sqrt(K)*t)/sqrt(K)
                            // K=0: J(t) = t
                            // K<0: J(t) = sinh(sqrt(-K)*t)/sqrt(-K)
                            function jacobi(tt, kk) {
                                if (Math.abs(kk) < 0.01) return tt;
                                if (kk > 0) {
                                    var sq = Math.sqrt(kk);
                                    return Math.sin(sq * tt) / sq;
                                } else {
                                    var sq2 = Math.sqrt(-kk);
                                    return Math.sinh(sq2 * tt) / sq2;
                                }
                            }

                            // Draw geodesic fan
                            for (var i = 0; i < numGeodesics; i++) {
                                var frac = (i / (numGeodesics - 1)) - 0.5;
                                var angle = frac * spreadAngle;
                                var col = i === Math.floor(numGeodesics / 2) ? viz.colors.blue : viz.colors.teal + '88';
                                var lw = i === Math.floor(numGeodesics / 2) ? 2.5 : 1.2;

                                ctx.strokeStyle = col;
                                ctx.lineWidth = lw;
                                ctx.beginPath();
                                var steps = 120;
                                for (var s = 0; s <= steps; s++) {
                                    var tt = (s / steps) * tMax;
                                    // In the embedding, represent geodesic deviation
                                    var along = tt;
                                    var perp = angle * jacobi(tt, K);
                                    var sx = viz.originX + perp * viz.scale;
                                    var sy = viz.originY - along * viz.scale;
                                    if (s === 0) ctx.moveTo(sx, sy);
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }

                            // Draw the Jacobi field vector at current time
                            var centerIdx = Math.floor(numGeodesics / 2);
                            var neighborIdx = centerIdx + 1;
                            var centerAngle = 0;
                            var neighborAngle = (1.0 / (numGeodesics - 1)) * spreadAngle;

                            var cAlong = animT;
                            var cPerp = centerAngle * jacobi(animT, K);
                            var nPerp = neighborAngle * jacobi(animT, K);

                            var cx = viz.originX + cPerp * viz.scale;
                            var cy = viz.originY - cAlong * viz.scale;
                            var nx = viz.originX + nPerp * viz.scale;
                            var ny = viz.originY - cAlong * viz.scale;

                            // Jacobi vector arrow
                            if (animT > 0.1) {
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(cx, cy);
                                ctx.lineTo(nx, ny);
                                ctx.stroke();

                                // Arrowhead
                                var dx = nx - cx;
                                var arrLen = Math.abs(dx);
                                if (arrLen > 4) {
                                    var dir = dx > 0 ? 1 : -1;
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.moveTo(nx, ny);
                                    ctx.lineTo(nx - dir * 8, ny - 5);
                                    ctx.lineTo(nx - dir * 8, ny + 5);
                                    ctx.closePath();
                                    ctx.fill();
                                }

                                // Label
                                viz.screenText('J(t)', nx + 14, ny - 2, viz.colors.orange, 13, 'left');

                                // Moving dot on center geodesic
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath();
                                ctx.arc(cx, cy, 4, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Origin point
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, 5, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('p', viz.originX - 12, viz.originY + 2, viz.colors.white, 12);

                            // Time indicator
                            viz.screenText('t = ' + animT.toFixed(2), viz.width - 60, viz.height - 20, viz.colors.text, 11);

                            // Conjugate point marker for positive curvature
                            if (K > 0.01) {
                                var tConj = Math.PI / Math.sqrt(K);
                                if (tConj < tMax) {
                                    var conjY = viz.originY - tConj * viz.scale;
                                    ctx.strokeStyle = viz.colors.red + '66';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([4, 4]);
                                    ctx.beginPath();
                                    ctx.moveTo(0, conjY);
                                    ctx.lineTo(viz.width, conjY);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                    viz.screenText('conjugate point (t = \u03C0/\u221AK)', viz.width / 2, conjY - 12, viz.colors.red, 11);
                                }
                            }
                        });
                        return viz;
                    }
                }
            ],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Jacobi Fields
        // ================================================================
        {
            id: 'sec-jacobi',
            title: 'Jacobi Fields',
            content: `
<h2>Jacobi Fields</h2>

<div class="env-block intuition">
    <div class="env-title">From Variation to ODE</div>
    <div class="env-body">
        <p>Consider a smooth one-parameter family of geodesics \\(\\gamma_s(t)\\) with \\(\\gamma_0 = \\gamma\\). The <em>variation vector field</em> \\(J(t) = \\frac{\\partial}{\\partial s}\\big|_{s=0} \\gamma_s(t)\\) measures how quickly neighboring geodesics deviate from \\(\\gamma\\). Since each \\(\\gamma_s\\) satisfies the geodesic equation, the field \\(J\\) must satisfy a specific second-order ODE along \\(\\gamma\\). This ODE is the <strong>Jacobi equation</strong>.</p>
    </div>
</div>

<h3>Deriving the Jacobi Equation</h3>

<p>Let \\(\\gamma_s(t)\\) be a smooth family of geodesics with \\(\\gamma_0 = \\gamma\\). Define \\(J(t) = \\frac{\\partial \\gamma_s}{\\partial s}\\big|_{s=0}\\) and \\(T(t) = \\dot{\\gamma}(t)\\). Since each \\(\\gamma_s\\) is a geodesic, we have \\(\\nabla_T T = 0\\) for all \\(s\\). Differentiating with respect to \\(s\\) and using the symmetry of the connection:</p>

\\[
0 = \\frac{D}{\\partial s}\\frac{D}{\\partial t}T = \\frac{D}{\\partial t}\\frac{D}{\\partial s}T + R(J, T)T.
\\]

<p>Since \\(\\frac{D}{\\partial s}T = \\frac{D}{\\partial t}J\\) (by symmetry of the Levi-Civita connection and the fact that \\([\\partial_s, \\partial_t] = 0\\)), this gives \\(\\frac{D^2}{dt^2}J + R(J, T)T = 0\\), where we write \\(\\frac{D}{dt}\\) for the covariant derivative along \\(\\gamma\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition (Jacobi Field)</div>
    <div class="env-body">
        <p>A vector field \\(J\\) along a geodesic \\(\\gamma\\) is a <strong>Jacobi field</strong> if it satisfies the <strong>Jacobi equation</strong>:</p>
        \\[
        \\frac{D^2 J}{dt^2} + R(J, \\dot{\\gamma})\\dot{\\gamma} = 0,
        \\]
        <p>where \\(R\\) is the Riemann curvature tensor and \\(\\frac{D}{dt}\\) denotes covariant differentiation along \\(\\gamma\\).</p>
    </div>
</div>

<p>This is a linear second-order ODE for \\(J\\) along \\(\\gamma\\). Given initial conditions \\(J(0)\\) and \\(\\frac{DJ}{dt}(0)\\), there exists a unique Jacobi field. Since the ODE is linear, the space of all Jacobi fields along a geodesic in an \\(n\\)-dimensional manifold is \\(2n\\)-dimensional.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 18.1 (Existence and Uniqueness)</div>
    <div class="env-body">
        <p>Let \\(\\gamma: [a,b] \\to M\\) be a geodesic. For any \\(v, w \\in T_{\\gamma(a)}M\\), there exists a unique Jacobi field \\(J\\) along \\(\\gamma\\) with \\(J(a) = v\\) and \\(\\frac{DJ}{dt}(a) = w\\).</p>
    </div>
</div>

<h3>Trivial Jacobi Fields</h3>

<p>Two types of Jacobi fields are always present and geometrically uninteresting:</p>
<ul>
    <li>\\(J(t) = \\dot{\\gamma}(t)\\): This corresponds to reparametrizing \\(\\gamma\\). Since \\(R(\\dot{\\gamma}, \\dot{\\gamma})\\dot{\\gamma} = 0\\) by the symmetries of \\(R\\), this satisfies the Jacobi equation trivially.</li>
    <li>\\(J(t) = (t - a)\\dot{\\gamma}(t)\\): This corresponds to varying the speed of the geodesic.</li>
</ul>

<p>The interesting Jacobi fields are those <strong>orthogonal to \\(\\dot{\\gamma}\\)</strong>. If \\(J(a) \\perp \\dot{\\gamma}(a)\\) and \\(\\frac{DJ}{dt}(a) \\perp \\dot{\\gamma}(a)\\), then \\(J(t) \\perp \\dot{\\gamma}(t)\\) for all \\(t\\). This follows from the identity:</p>

\\[
\\frac{d^2}{dt^2}\\langle J, \\dot{\\gamma}\\rangle = \\langle \\frac{D^2 J}{dt^2}, \\dot{\\gamma}\\rangle = -\\langle R(J, \\dot{\\gamma})\\dot{\\gamma}, \\dot{\\gamma}\\rangle = 0,
\\]

<p>where the last equality uses the skew-symmetry \\(R(X,Y,Z,Z) = 0\\).</p>

<h3>Constant Curvature: Explicit Solutions</h3>

<p>When \\((M, g)\\) has constant sectional curvature \\(K\\), the Jacobi equation for a normal (orthogonal to \\(\\dot{\\gamma}\\), unit-speed) Jacobi field with \\(J(0) = 0\\) reduces to a scalar ODE \\(f'' + Kf = 0\\), where \\(J(t) = f(t) E(t)\\) for a parallel unit field \\(E\\) along \\(\\gamma\\). The solutions are:</p>

<div class="env-block theorem">
    <div class="env-title">Proposition 18.2 (Jacobi Fields in Constant Curvature)</div>
    <div class="env-body">
        <p>On a space of constant sectional curvature \\(K\\), the normal Jacobi field along a unit-speed geodesic with \\(J(0) = 0\\) and \\(\\|J'(0)\\| = 1\\) has magnitude:</p>
        \\[
        \\|J(t)\\| = \\begin{cases}
        \\frac{1}{\\sqrt{K}}\\sin(\\sqrt{K}\\, t) & K > 0, \\\\[6pt]
        t & K = 0, \\\\[6pt]
        \\frac{1}{\\sqrt{-K}}\\sinh(\\sqrt{-K}\\, t) & K < 0.
        \\end{cases}
        \\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-conjugate-point"></div>
`,
            visualizations: [
                {
                    id: 'viz-conjugate-point',
                    title: 'Conjugate Points on the Sphere',
                    description: 'On a unit sphere (\\(K = 1\\)), all geodesics (great circles) from the north pole reconverge at the south pole. The south pole is the first conjugate point at \\(t = \\pi\\). The Jacobi field \\(J(t) = \\sin(t)\\,E(t)\\) vanishes at \\(t = 0\\) and \\(t = \\pi\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 50
                        });

                        var numGeodesics = 12;
                        var time = 0;

                        viz.animate(function(t) {
                            time = (t % 6000) / 6000;
                            viz.clear();
                            var ctx = viz.ctx;
                            var animT = time * Math.PI * 2;

                            // Draw sphere as ellipse (side view)
                            var R = 3;
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.ellipse(viz.originX, viz.originY, R * viz.scale, R * viz.scale, 0, 0, Math.PI * 2);
                            ctx.stroke();

                            // Draw equator as flattened ellipse
                            ctx.strokeStyle = viz.colors.grid + '66';
                            ctx.beginPath();
                            ctx.ellipse(viz.originX, viz.originY, R * viz.scale, R * viz.scale * 0.3, 0, 0, Math.PI * 2);
                            ctx.stroke();

                            // North pole
                            var npx = viz.originX;
                            var npy = viz.originY - R * viz.scale;
                            // South pole
                            var spx = viz.originX;
                            var spy = viz.originY + R * viz.scale;

                            // Draw geodesics as half-ellipses from N to S
                            for (var i = 0; i < numGeodesics; i++) {
                                var angle = (i / numGeodesics) * Math.PI;
                                var flatness = Math.cos(angle);

                                ctx.strokeStyle = viz.colors.teal + '77';
                                ctx.lineWidth = 1.2;
                                ctx.beginPath();
                                for (var s = 0; s <= 60; s++) {
                                    var frac = s / 60;
                                    var theta = frac * Math.PI;
                                    var gx = viz.originX + flatness * R * Math.sin(theta) * viz.scale;
                                    var gy = viz.originY - R * Math.cos(theta) * viz.scale;
                                    if (s === 0) ctx.moveTo(gx, gy);
                                    else ctx.lineTo(gx, gy);
                                }
                                ctx.stroke();

                                // Moving point along each geodesic
                                var theta2 = (animT < Math.PI) ? animT : animT;
                                if (theta2 <= Math.PI) {
                                    var px = viz.originX + flatness * R * Math.sin(theta2) * viz.scale;
                                    var py = viz.originY - R * Math.cos(theta2) * viz.scale;
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.arc(px, py, 3, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }

                            // North pole marker
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.arc(npx, npy, 6, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('N (source)', npx + 15, npy, viz.colors.white, 11, 'left');

                            // South pole marker
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.arc(spx, spy, 6, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('S (conjugate)', spx + 15, spy, viz.colors.red, 11, 'left');

                            // Jacobi field magnitude plot (bottom right)
                            var plotX = 380, plotY = 30, plotW = 160, plotH = 80;
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            ctx.strokeRect(plotX, plotY, plotW, plotH);

                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var s2 = 0; s2 <= 100; s2++) {
                                var tt = (s2 / 100) * Math.PI;
                                var val = Math.sin(tt);
                                var px2 = plotX + (s2 / 100) * plotW;
                                var py2 = plotY + plotH - val * plotH;
                                if (s2 === 0) ctx.moveTo(px2, py2);
                                else ctx.lineTo(px2, py2);
                            }
                            ctx.stroke();

                            viz.screenText('|J(t)| = sin(t)', plotX + plotW / 2, plotY - 10, viz.colors.orange, 10);
                            viz.screenText('0', plotX - 8, plotY + plotH, viz.colors.text, 9);
                            viz.screenText('\u03C0', plotX + plotW, plotY + plotH + 12, viz.colors.text, 9);

                            // Current time marker on plot
                            var tNorm = Math.min(animT, Math.PI);
                            var markerX = plotX + (tNorm / Math.PI) * plotW;
                            var markerY = plotY + plotH - Math.sin(tNorm) * plotH;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.arc(markerX, markerY, 3, 0, Math.PI * 2);
                            ctx.fill();

                            viz.screenText('All geodesics from N reconverge at S: conjugate point at t = \u03C0', viz.width / 2, viz.height - 15, viz.colors.white, 11);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that if \\(J\\) is a Jacobi field along a geodesic \\(\\gamma\\), then so is \\(aJ\\) for any constant \\(a \\in \\mathbb{R}\\). What does this say about the space of Jacobi fields?',
                    hint: 'The Jacobi equation is linear: if \\(J\\) satisfies \\(J\'\' + R(J, \\dot{\\gamma})\\dot{\\gamma} = 0\\), check that \\(aJ\\) does too.',
                    solution: 'Since \\(\\frac{D^2(aJ)}{dt^2} = a\\frac{D^2J}{dt^2}\\) and \\(R(aJ, \\dot{\\gamma})\\dot{\\gamma} = aR(J, \\dot{\\gamma})\\dot{\\gamma}\\) by linearity of \\(R\\) in the first argument, we get \\(a\\left(\\frac{D^2J}{dt^2} + R(J, \\dot{\\gamma})\\dot{\\gamma}\\right) = 0\\). The space of Jacobi fields is a vector space (in fact \\(2n\\)-dimensional, since initial conditions \\(J(0), J\'(0)\\) each live in \\(T_{\\gamma(0)}M \\cong \\mathbb{R}^n\\)).'
                },
                {
                    question: 'On a space of constant curvature \\(K = 4\\), find the first positive time \\(t_0\\) at which the normal Jacobi field with \\(J(0) = 0\\) vanishes. This is the first conjugate time.',
                    hint: 'Use the formula \\(\\|J(t)\\| = \\frac{1}{\\sqrt{K}}\\sin(\\sqrt{K}\\,t)\\) and find the first positive zero of \\(\\sin(2t)\\).',
                    solution: 'With \\(K = 4\\), \\(\\sqrt{K} = 2\\), so \\(\\|J(t)\\| = \\frac{1}{2}\\sin(2t)\\). The first positive zero of \\(\\sin(2t)\\) occurs at \\(2t = \\pi\\), i.e., \\(t_0 = \\pi/2\\). Compare with \\(K = 1\\) where the first conjugate time is \\(\\pi\\); higher curvature causes faster reconvergence.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Conjugate Points
        // ================================================================
        {
            id: 'sec-conjugate',
            title: 'Conjugate Points',
            content: `
<h2>Conjugate Points</h2>

<div class="env-block intuition">
    <div class="env-title">When Geodesics Stop Minimizing</div>
    <div class="env-body">
        <p>On a sphere, the shortest path from the north pole to any point in the southern hemisphere is a great circle arc shorter than \\(\\pi\\). Once you pass the south pole (the antipodal point), that great circle is no longer the shortest path; you could go the other way. The south pole is a <em>conjugate point</em>, and it marks exactly where the geodesic loses its minimizing property.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Conjugate Point)</div>
    <div class="env-body">
        <p>Let \\(\\gamma: [0, L] \\to M\\) be a geodesic. The point \\(\\gamma(t_0)\\) is <strong>conjugate to \\(\\gamma(0)\\)</strong> along \\(\\gamma\\) if there exists a nonzero Jacobi field \\(J\\) along \\(\\gamma\\) with \\(J(0) = 0\\) and \\(J(t_0) = 0\\).</p>
        <p>The <strong>multiplicity</strong> of the conjugate point is the dimension of the space of such Jacobi fields.</p>
    </div>
</div>

<p>The condition \\(J(0) = 0\\) means the variation fixes the starting point. The condition \\(J(t_0) = 0\\) means the varied geodesics "refocus" at \\(\\gamma(t_0)\\). The existence of a conjugate point has deep consequences for minimality:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 18.3 (Conjugate Points and Minimality)</div>
    <div class="env-body">
        <p>Let \\(\\gamma: [0, L] \\to M\\) be a geodesic.</p>
        <ol>
            <li>If \\(\\gamma\\) has no conjugate points in \\((0, L)\\), then \\(\\gamma\\) is a local minimum of the length functional (among curves with the same endpoints).</li>
            <li>If \\(\\gamma(t_0)\\) is conjugate to \\(\\gamma(0)\\) with \\(0 < t_0 < L\\), then \\(\\gamma\\) is <strong>not</strong> a length-minimizing geodesic from \\(\\gamma(0)\\) to \\(\\gamma(L)\\).</li>
        </ol>
    </div>
</div>

<p>This theorem connects the Jacobi equation (a local, linear-algebraic condition) to the global behavior of the distance function. The proof uses the second variation of arc length, which we sketch below.</p>

<h3>Second Variation of Arc Length</h3>

<p>For a geodesic \\(\\gamma\\) and a proper variation \\(\\gamma_s\\) (fixing endpoints), the second variation of the energy functional is:</p>

\\[
E''(0) = \\int_0^L \\left( \\left\\langle \\frac{DJ}{dt}, \\frac{DJ}{dt} \\right\\rangle - \\langle R(J, \\dot{\\gamma})\\dot{\\gamma}, J \\rangle \\right) dt,
\\]

<p>where \\(J = \\frac{\\partial \\gamma_s}{\\partial s}\\big|_{s=0}\\) is the variation field. If \\(E''(0) < 0\\) for some variation, the geodesic is not a minimizer. The Jacobi equation is precisely the Euler-Lagrange equation for \\(E''(0) = 0\\), so conjugate points are the "critical points" of the second variation.</p>

<h3>Conjugate Points and the Exponential Map</h3>

<div class="env-block theorem">
    <div class="env-title">Proposition 18.4</div>
    <div class="env-body">
        <p>The point \\(\\gamma(t_0) = \\exp_p(t_0 v)\\) is conjugate to \\(p = \\gamma(0)\\) along \\(\\gamma(t) = \\exp_p(tv)\\) if and only if \\(t_0 v\\) is a critical point of \\(\\exp_p\\), i.e., \\(d(\\exp_p)_{t_0 v}\\) is singular.</p>
    </div>
</div>

<p>This gives a clean geometric picture: conjugate points are exactly where the exponential map fails to be a local diffeomorphism. The "fan" of geodesics from \\(p\\) develops a "fold" at the conjugate locus.</p>

<div class="env-block example">
    <div class="env-title">Example: The Sphere \\(S^n\\)</div>
    <div class="env-body">
        <p>On the unit sphere \\(S^n\\), every point \\(p\\) has a unique conjugate point: its antipode \\(-p\\), at distance \\(\\pi\\). The multiplicity is \\(n - 1\\) (every normal Jacobi field vanishes at the antipode). The exponential map \\(\\exp_p: T_pS^n \\to S^n\\) has the sphere of radius \\(\\pi\\) as its critical set.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-positive-curvature-focusing"></div>
`,
            visualizations: [
                {
                    id: 'viz-positive-curvature-focusing',
                    title: 'Positive Curvature: Geodesic Focusing',
                    description: 'On a positively curved surface, geodesics from a point converge. The Jacobi field oscillates (\\(\\sin\\)-like), vanishing at conjugate points. Drag the curvature slider to see how higher curvature brings the conjugate point closer.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 60, originY: 340, scale: 1
                        });

                        var K = 1.0;
                        VizEngine.createSlider(controls, 'K (curvature)', 0.2, 4, K, 0.1, function(v) {
                            K = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Jacobi field magnitude |J(t)| with K = ' + K.toFixed(1), viz.width / 2, 20, viz.colors.white, 14);

                            var sqK = Math.sqrt(K);
                            var tConj = Math.PI / sqK;
                            var plotL = 50, plotR = 520, plotT = 60, plotB = 300;
                            var plotW = plotR - plotL, plotH = plotB - plotT;
                            var tMax = Math.max(tConj * 1.5, 4);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(plotL, plotB);
                            ctx.lineTo(plotR, plotB);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(plotL, plotB);
                            ctx.lineTo(plotL, plotT);
                            ctx.stroke();

                            // Labels
                            viz.screenText('t', plotR + 10, plotB, viz.colors.text, 11);
                            viz.screenText('|J(t)|', plotL - 5, plotT - 10, viz.colors.text, 11);

                            // Scale: max of |J| is 1/sqrt(K)
                            var yMax = 1.0 / sqK * 1.3;

                            // Draw J(t) = sin(sqrt(K)*t)/sqrt(K)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 300; i++) {
                                var t = (i / 300) * tMax;
                                var val = Math.sin(sqK * t) / sqK;
                                var px = plotL + (t / tMax) * plotW;
                                var py = plotB - (val / yMax) * plotH;
                                if (i === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Draw comparison: flat space J(t) = t
                            ctx.strokeStyle = viz.colors.text + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            for (var i2 = 0; i2 <= 300; i2++) {
                                var t2 = (i2 / 300) * tMax;
                                var val2 = t2;
                                if (val2 > yMax * 1.2) break;
                                var px2 = plotL + (t2 / tMax) * plotW;
                                var py2 = plotB - (val2 / yMax) * plotH;
                                if (i2 === 0) ctx.moveTo(px2, py2);
                                else ctx.lineTo(px2, py2);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Mark conjugate point
                            var conjX = plotL + (tConj / tMax) * plotW;
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(conjX, plotT);
                            ctx.lineTo(conjX, plotB);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.arc(conjX, plotB, 5, 0, Math.PI * 2);
                            ctx.fill();

                            viz.screenText('t = \u03C0/\u221AK = ' + tConj.toFixed(2), conjX, plotB + 18, viz.colors.red, 11);
                            viz.screenText('first conjugate point', conjX, plotB + 32, viz.colors.red, 10);

                            // Legend
                            viz.screenText('sin(\u221AK t)/\u221AK', plotR - 60, plotT + 20, viz.colors.orange, 10);
                            viz.screenText('flat: t (dashed)', plotR - 60, plotT + 35, viz.colors.text, 10);

                            // Info
                            viz.screenText('Positive curvature makes J(t) < t: geodesics converge faster than in flat space.', viz.width / 2, plotB + 55, viz.colors.teal, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'On the sphere \\(S^2\\) of radius \\(r\\) (so \\(K = 1/r^2\\)), what is the distance from the north pole to its first conjugate point? How does this change as \\(r \\to \\infty\\)?',
                    hint: 'The first conjugate time is \\(\\pi/\\sqrt{K}\\). The geodesic distance is the same as the conjugate time for unit-speed geodesics.',
                    solution: 'With \\(K = 1/r^2\\), the first conjugate time is \\(t_0 = \\pi/\\sqrt{1/r^2} = \\pi r\\). This is indeed the distance from the north pole to the south pole along a great circle. As \\(r \\to \\infty\\), \\(t_0 \\to \\infty\\): the sphere approaches a flat plane and the conjugate point recedes to infinity, consistent with the fact that flat space has no conjugate points.'
                },
                {
                    question: 'Show that a geodesic in a space of non-positive curvature (\\(K \\leq 0\\)) has no conjugate points.',
                    hint: 'Consider the function \\(f(t) = \\langle J(t), J(t) \\rangle\\) for a Jacobi field with \\(J(0) = 0\\) and \\(J\'(0) \\neq 0\\). Compute \\(f\'\'(t)\\) and use the sign of the curvature.',
                    solution: 'For a Jacobi field \\(J\\) with \\(J(0) = 0\\), \\(J\'(0) \\neq 0\\), set \\(f(t) = \\|J(t)\\|^2\\). Then \\(f(0) = 0\\), \\(f\'(0) = 0\\), and \\(f\'\'(0) = 2\\|J\'(0)\\|^2 > 0\\). More generally, \\(f\'\'(t) = 2\\|J\'(t)\\|^2 - 2\\langle R(J, \\dot{\\gamma})\\dot{\\gamma}, J \\rangle = 2\\|J\'\\|^2 + 2K(J, \\dot{\\gamma})\\|J \\wedge \\dot{\\gamma}\\|^2\\). With \\(K \\leq 0\\), the sectional curvature term is \\(\\geq 0\\), so \\(f\'\'(t) \\geq 2\\|J\'(t)\\|^2 \\geq 0\\). Since \\(f\\) starts at 0, is initially increasing, and is convex, it can never return to 0. Hence \\(J(t) \\neq 0\\) for all \\(t > 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Positive Curvature
        // ================================================================
        {
            id: 'sec-positive-curvature',
            title: 'Positive Curvature',
            content: `
<h2>Positive Curvature: Convergence and Compactness</h2>

<div class="env-block intuition">
    <div class="env-title">The Sphere as Paradigm</div>
    <div class="env-body">
        <p>On a sphere, positive curvature forces all geodesics from a point to reconverge at the antipodal point. This is not an accident of the sphere's symmetry; it is a manifestation of a deep principle: <strong>positive Ricci curvature forces geodesics to focus</strong>. The focusing is strong enough to force the manifold to be compact (finite volume), with a definite upper bound on its diameter.</p>
    </div>
</div>

<h3>The Bonnet-Myers Theorem</h3>

<p>The Bonnet-Myers theorem is one of the most striking results connecting local curvature to global topology. It says that a lower bound on Ricci curvature implies an upper bound on diameter.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 18.5 (Bonnet-Myers)</div>
    <div class="env-body">
        <p>Let \\((M^n, g)\\) be a complete Riemannian manifold with Ricci curvature satisfying \\(\\mathrm{Ric} \\geq (n-1)\\kappa g\\) for some \\(\\kappa > 0\\). Then:</p>
        <ol>
            <li>The diameter of \\(M\\) satisfies \\(\\mathrm{diam}(M) \\leq \\frac{\\pi}{\\sqrt{\\kappa}}\\).</li>
            <li>\\(M\\) is compact.</li>
            <li>The fundamental group \\(\\pi_1(M)\\) is finite.</li>
        </ol>
    </div>
</div>

<h3>Proof Sketch</h3>

<p>The key idea is to show that every geodesic of length greater than \\(\\pi/\\sqrt{\\kappa}\\) must have a conjugate point, and therefore cannot be minimizing.</p>

<p>Let \\(\\gamma: [0, L] \\to M\\) be a unit-speed geodesic with \\(L > \\pi/\\sqrt{\\kappa}\\). Choose an orthonormal basis \\(\\{e_1, \\ldots, e_{n-1}\\}\\) for \\(\\dot{\\gamma}(0)^\\perp\\) and extend each \\(e_i\\) to a parallel field \\(E_i(t)\\) along \\(\\gamma\\). Consider the variation fields \\(V_i(t) = \\sin(\\pi t/L) E_i(t)\\). The second variation of energy gives:</p>

\\[
E''_i(0) = \\int_0^L \\left( \\frac{\\pi^2}{L^2}\\cos^2\\!\\frac{\\pi t}{L} - \\sin^2\\!\\frac{\\pi t}{L}\\, K(E_i, \\dot{\\gamma}) \\right) dt.
\\]

<p>Summing over \\(i = 1, \\ldots, n-1\\):</p>

\\[
\\sum_{i=1}^{n-1} E''_i(0) = \\int_0^L \\left( (n-1)\\frac{\\pi^2}{L^2}\\cos^2\\!\\frac{\\pi t}{L} - \\sin^2\\!\\frac{\\pi t}{L}\\, \\mathrm{Ric}(\\dot{\\gamma}) \\right) dt.
\\]

<p>Using \\(\\mathrm{Ric}(\\dot{\\gamma}) \\geq (n-1)\\kappa\\) and \\(L > \\pi/\\sqrt{\\kappa}\\), one shows the sum is negative. Therefore at least one \\(E''_i(0) < 0\\), meaning \\(\\gamma\\) is not length-minimizing. Since any two points at distance \\(> \\pi/\\sqrt{\\kappa}\\) would need a minimizing geodesic between them, the diameter is bounded.</p>

<div class="env-block example">
    <div class="env-title">Example: Round Sphere \\(S^n(r)\\)</div>
    <div class="env-body">
        <p>The sphere \\(S^n(r)\\) has \\(\\mathrm{Ric} = (n-1)/r^2 \\cdot g\\), so \\(\\kappa = 1/r^2\\). Bonnet-Myers gives \\(\\mathrm{diam} \\leq \\pi r\\), which is sharp: the actual diameter of \\(S^n(r)\\) is \\(\\pi r\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(\\mathbb{R}P^n\\)</div>
    <div class="env-body">
        <p>Real projective space \\(\\mathbb{R}P^n\\) inherits from \\(S^n\\) the same Ricci lower bound. Its diameter is \\(\\pi r / 2\\) (half that of the sphere, since we identify antipodal points). The fundamental group is \\(\\mathbb{Z}/2\\mathbb{Z}\\), which is finite, consistent with Bonnet-Myers.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-bonnet-myers"></div>
`,
            visualizations: [
                {
                    id: 'viz-bonnet-myers',
                    title: 'Bonnet-Myers: Positive Ricci Implies Bounded Diameter',
                    description: 'Visualization of the Bonnet-Myers theorem. Geodesics on a positively curved surface must have conjugate points within distance \\(\\pi/\\sqrt{\\kappa}\\). This forces the manifold to be compact. Compare the diameter bound with the actual diameter of a sphere.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var kappa = 1.0;
                        VizEngine.createSlider(controls, '\u03BA (Ricci lower bound)', 0.1, 4, kappa, 0.1, function(v) {
                            kappa = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var diam = Math.PI / Math.sqrt(kappa);
                            var r = 1 / Math.sqrt(kappa);

                            viz.screenText('Bonnet-Myers Theorem', viz.width / 2, 20, viz.colors.white, 15);
                            viz.screenText('Ric \u2265 (n-1)\u03BA g,  \u03BA = ' + kappa.toFixed(1), viz.width / 2, 42, viz.colors.teal, 12);

                            // Draw a sphere representation
                            var cx = 170, cy = 200, dispR = Math.min(120, 120 * r);

                            // Sphere outline
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(cx, cy, dispR, 0, Math.PI * 2);
                            ctx.stroke();

                            // Equator
                            ctx.strokeStyle = viz.colors.blue + '44';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.ellipse(cx, cy, dispR, dispR * 0.3, 0, 0, Math.PI * 2);
                            ctx.stroke();

                            // Diameter line
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.moveTo(cx, cy - dispR);
                            ctx.lineTo(cx, cy + dispR);
                            ctx.stroke();

                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(cx, cy - dispR, 4, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.beginPath();
                            ctx.arc(cx, cy + dispR, 4, 0, Math.PI * 2);
                            ctx.fill();

                            viz.screenText('diam \u2264 \u03C0/\u221A\u03BA', cx, cy + dispR + 22, viz.colors.orange, 12);

                            // Right panel: numerical info
                            var rx = 340, ry = 80;
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(rx - 10, ry - 10, 220, 200);

                            viz.screenText('Curvature bound:', rx + 100, ry, viz.colors.text, 12);
                            viz.screenText('\u03BA = ' + kappa.toFixed(2), rx + 100, ry + 22, viz.colors.teal, 14);

                            viz.screenText('Diameter bound:', rx + 100, ry + 55, viz.colors.text, 12);
                            viz.screenText('\u03C0/\u221A\u03BA = ' + diam.toFixed(3), rx + 100, ry + 77, viz.colors.orange, 14);

                            viz.screenText('Sphere radius:', rx + 100, ry + 110, viz.colors.text, 12);
                            viz.screenText('r = 1/\u221A\u03BA = ' + r.toFixed(3), rx + 100, ry + 132, viz.colors.blue, 14);

                            viz.screenText('Sphere diam = \u03C0r = ' + (Math.PI * r).toFixed(3), rx + 100, ry + 165, viz.colors.purple, 12);
                            viz.screenText('(bound is sharp for spheres)', rx + 100, ry + 183, viz.colors.text, 10);

                            // Bottom: consequences
                            viz.screenText('Consequences: M is compact, \u03C0\u2081(M) is finite, vol(M) < \u221E', viz.width / 2, 340, viz.colors.white, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The Einstein static universe is \\(S^3 \\times \\mathbb{R}\\) with the product metric. Does Bonnet-Myers apply? What is the diameter?',
                    hint: 'Think about the Ricci curvature in the \\(\\mathbb{R}\\) direction. Is the Ricci curvature bounded below by a positive constant in all directions?',
                    solution: 'Bonnet-Myers does <strong>not</strong> apply. While the \\(S^3\\) factor contributes positive Ricci curvature, the \\(\\mathbb{R}\\) direction has zero Ricci curvature. The condition \\(\\mathrm{Ric} \\geq (n-1)\\kappa g\\) with \\(\\kappa > 0\\) fails for tangent vectors in the \\(\\mathbb{R}\\) direction. Indeed, \\(S^3 \\times \\mathbb{R}\\) is not compact and has infinite diameter, confirming that the positivity of Ricci in <em>all</em> directions is essential.'
                },
                {
                    question: 'If \\((M^n, g)\\) is a complete Riemannian manifold with \\(\\mathrm{Ric} \\geq (n-1)g\\), show that every geodesic loop (a geodesic from \\(p\\) back to \\(p\\)) has length at most \\(2\\pi\\).',
                    hint: 'The diameter bound gives the maximum distance between any two points. A geodesic loop is a geodesic that goes from \\(p\\) to \\(p\\), but it might pass through a point \\(q\\) at maximum distance from \\(p\\).',
                    solution: 'By Bonnet-Myers with \\(\\kappa = 1\\), \\(\\mathrm{diam}(M) \\leq \\pi\\). A geodesic from \\(p\\) back to \\(p\\) can be split at any intermediate point \\(q\\). The distance from \\(p\\) to \\(q\\) is at most \\(\\pi\\), and from \\(q\\) back to \\(p\\) is at most \\(\\pi\\), giving total length at most \\(2\\pi\\). More precisely, a minimizing geodesic segment of the loop from \\(p\\) to any point on it has length \\(\\leq \\pi\\), and the loop consists of two such arcs.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Negative Curvature
        // ================================================================
        {
            id: 'sec-negative-curvature',
            title: 'Negative Curvature',
            content: `
<h2>Negative Curvature: Divergence and Universality</h2>

<div class="env-block intuition">
    <div class="env-title">Hyperbolic Spreading</div>
    <div class="env-body">
        <p>In the hyperbolic plane, geodesics from a point spread apart exponentially: \\(\\|J(t)\\| = \\sinh(t)\\) grows like \\(e^t/2\\) for large \\(t\\). There are no conjugate points, so every geodesic is locally minimizing for all time. This absence of focusing has a topological consequence: the universal cover of the manifold is diffeomorphic to \\(\\mathbb{R}^n\\).</p>
    </div>
</div>

<h3>No Conjugate Points in Nonpositive Curvature</h3>

<p>We proved in the previous section that nonpositive sectional curvature implies no conjugate points. This means the exponential map \\(\\exp_p: T_pM \\to M\\) is a local diffeomorphism everywhere. For the universal cover, we get much more:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 18.6 (Cartan-Hadamard)</div>
    <div class="env-body">
        <p>Let \\((M^n, g)\\) be a complete Riemannian manifold with nonpositive sectional curvature (\\(K \\leq 0\\)). Then:</p>
        <ol>
            <li>For every \\(p \\in M\\), the exponential map \\(\\exp_p: T_pM \\to M\\) is a covering map.</li>
            <li>If \\(M\\) is simply connected, then \\(\\exp_p\\) is a diffeomorphism and \\(M\\) is diffeomorphic to \\(\\mathbb{R}^n\\).</li>
            <li>In particular, the universal cover \\(\\widetilde{M}\\) is diffeomorphic to \\(\\mathbb{R}^n\\).</li>
        </ol>
    </div>
</div>

<h3>Proof Sketch</h3>

<p>The argument proceeds in two steps:</p>

<p><strong>Step 1: \\(\\exp_p\\) is a local diffeomorphism.</strong> Since \\(K \\leq 0\\), there are no conjugate points, so \\(d(\\exp_p)_v\\) is non-singular for all \\(v \\in T_pM\\). Hence \\(\\exp_p\\) is a local diffeomorphism.</p>

<p><strong>Step 2: \\(\\exp_p\\) is a covering map.</strong> By the Hopf-Rinow theorem, \\((M, g)\\) is complete, so \\(\\exp_p\\) is defined on all of \\(T_pM\\). One shows that \\(\\exp_p\\) is a proper map (preimages of compact sets are compact) using the fact that geodesics diverge. A proper local homeomorphism between connected manifolds is a covering map.</p>

<p>If \\(M\\) is simply connected, the only covering map \\(\\mathbb{R}^n \\to M\\) that exists is a diffeomorphism. Hence \\(M \\cong \\mathbb{R}^n\\).</p>

<div class="env-block example">
    <div class="env-title">Example: Hyperbolic Space \\(\\mathbb{H}^n\\)</div>
    <div class="env-body">
        <p>Hyperbolic space has constant curvature \\(K = -1\\) and is simply connected. The Cartan-Hadamard theorem confirms that \\(\\exp_p: \\mathbb{R}^n \\to \\mathbb{H}^n\\) is a diffeomorphism. This is consistent with the Poincare disk and upper half-space models, both of which are homeomorphic to \\(\\mathbb{R}^n\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Surfaces of Higher Genus</div>
    <div class="env-body">
        <p>A closed orientable surface \\(\\Sigma_g\\) of genus \\(g \\geq 2\\) admits a metric of constant curvature \\(-1\\). By Cartan-Hadamard, its universal cover is the hyperbolic plane \\(\\mathbb{H}^2\\). The surface is a quotient \\(\\Sigma_g = \\mathbb{H}^2 / \\Gamma\\) where \\(\\Gamma\\) is a discrete group of isometries. The fundamental group \\(\\pi_1(\\Sigma_g)\\) is infinite (contrast with Bonnet-Myers, where positive curvature forces \\(\\pi_1\\) to be finite).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-negative-curvature-spreading"></div>
`,
            visualizations: [
                {
                    id: 'viz-negative-curvature-spreading',
                    title: 'Negative Curvature: Geodesic Spreading',
                    description: 'In hyperbolic space (\\(K < 0\\)), geodesics from a point diverge exponentially. The Jacobi field \\(|J(t)| = \\sinh(\\sqrt{|K|}\\,t)/\\sqrt{|K|}\\) grows without bound. There are no conjugate points.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 60, originY: 340, scale: 1
                        });

                        var K = -1.0;
                        VizEngine.createSlider(controls, '|K| (neg. curvature)', 0.1, 3, Math.abs(K), 0.1, function(v) {
                            K = -v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var absK = Math.abs(K);
                            var sqK = Math.sqrt(absK);

                            viz.screenText('Jacobi field in negative curvature K = ' + K.toFixed(1), viz.width / 2, 20, viz.colors.white, 14);

                            var plotL = 60, plotR = 520, plotT = 60, plotB = 300;
                            var plotW = plotR - plotL, plotH = plotB - plotT;
                            var tMax = 3.5;

                            // Find yMax: sinh(sqK * tMax)/sqK
                            var yMax = Math.sinh(sqK * tMax) / sqK * 1.1;
                            if (yMax < 4) yMax = 4;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(plotL, plotB);
                            ctx.lineTo(plotR, plotB);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(plotL, plotB);
                            ctx.lineTo(plotL, plotT);
                            ctx.stroke();

                            viz.screenText('t', plotR + 10, plotB, viz.colors.text, 11);
                            viz.screenText('|J(t)|', plotL - 5, plotT - 10, viz.colors.text, 11);

                            // Draw sinh curve: J(t) = sinh(sqK*t)/sqK
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 300; i++) {
                                var t = (i / 300) * tMax;
                                var val = Math.sinh(sqK * t) / sqK;
                                var px = plotL + (t / tMax) * plotW;
                                var py = plotB - (val / yMax) * plotH;
                                if (py < plotT - 10) break;
                                if (i === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Flat comparison: J(t) = t
                            ctx.strokeStyle = viz.colors.text + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            for (var i2 = 0; i2 <= 300; i2++) {
                                var t2 = (i2 / 300) * tMax;
                                var px2 = plotL + (t2 / tMax) * plotW;
                                var py2 = plotB - (t2 / yMax) * plotH;
                                if (py2 < plotT - 10) break;
                                if (i2 === 0) ctx.moveTo(px2, py2);
                                else ctx.lineTo(px2, py2);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Positive curvature comparison if mild
                            ctx.strokeStyle = viz.colors.orange + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([2, 4]);
                            ctx.beginPath();
                            for (var i3 = 0; i3 <= 300; i3++) {
                                var t3 = (i3 / 300) * tMax;
                                var val3 = Math.sin(t3);
                                if (val3 < -0.1) break;
                                var px3 = plotL + (t3 / tMax) * plotW;
                                var py3 = plotB - (val3 / yMax) * plotH;
                                if (i3 === 0) ctx.moveTo(px3, py3);
                                else ctx.lineTo(px3, py3);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Legend
                            viz.screenText('sinh(\u221A|K| t)/\u221A|K|', plotR - 80, plotT + 15, viz.colors.purple, 10);
                            viz.screenText('flat: t (dashed)', plotR - 80, plotT + 30, viz.colors.text, 10);
                            viz.screenText('K=+1: sin(t)', plotR - 80, plotT + 45, viz.colors.orange, 10);

                            // Info
                            viz.screenText('Negative curvature: |J(t)| > t always. No conjugate points. exp_p is a covering map.', viz.width / 2, plotB + 45, viz.colors.teal, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\lim_{t \\to \\infty} \\frac{\\|J(t)\\|}{t}\\) for a Jacobi field on a space of constant curvature \\(K = -1\\). Interpret the result.',
                    hint: 'Use \\(\\|J(t)\\| = \\sinh(t)\\) and the asymptotic formula \\(\\sinh(t) \\sim e^t/2\\) for large \\(t\\).',
                    solution: 'We have \\(\\|J(t)\\| = \\sinh(t)\\) and \\(\\lim_{t \\to \\infty} \\sinh(t)/t = \\infty\\). More precisely, \\(\\sinh(t)/t \\sim e^t/(2t) \\to \\infty\\). Geodesics diverge exponentially faster than in flat space, where \\(\\|J(t)\\| = t\\). This exponential divergence is the geometric content of "negative curvature" and is related to the instability of geodesic flow (positive Lyapunov exponents).'
                },
                {
                    question: 'A flat torus \\(T^2 = \\mathbb{R}^2 / \\mathbb{Z}^2\\) has \\(K = 0\\). Its universal cover is \\(\\mathbb{R}^2\\). Does Cartan-Hadamard apply? Is the torus itself diffeomorphic to \\(\\mathbb{R}^2\\)?',
                    hint: 'Check whether the torus is simply connected. The Cartan-Hadamard theorem says the universal cover is \\(\\mathbb{R}^n\\), not the manifold itself.',
                    solution: 'Yes, Cartan-Hadamard applies since \\(K = 0 \\leq 0\\) and the torus is complete. The theorem says the universal cover is diffeomorphic to \\(\\mathbb{R}^2\\), which is correct (the universal cover of \\(T^2\\) is \\(\\mathbb{R}^2\\)). But the torus itself is <strong>not</strong> diffeomorphic to \\(\\mathbb{R}^2\\); it is not simply connected (\\(\\pi_1(T^2) = \\mathbb{Z}^2\\)). The conclusion "\\(M \\cong \\mathbb{R}^n\\)" applies only when \\(M\\) is simply connected.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge to What Comes Next
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Bridge',
            content: `
<h2>Looking Back, Looking Forward</h2>

<h3>The Story So Far</h3>

<p>We began this course with curves in \\(\\mathbb{R}^n\\) (Ch 0-2), measuring curvature and torsion through the Frenet frame. We moved to surfaces in \\(\\mathbb{R}^3\\) (Ch 3-10), discovering that Gaussian curvature is intrinsic (Theorema Egregium) and constrains topology (Gauss-Bonnet). We then abstracted to smooth manifolds (Ch 11-13) and equipped them with Riemannian metrics (Ch 14), connections (Ch 15), geodesics (Ch 16), and curvature tensors (Ch 17).</p>

<p>In this chapter, Jacobi fields brought all of these tools together. The Jacobi equation is the linearization of the geodesic equation, and its solutions encode how curvature shapes the geometry at the infinitesimal level. The two grand theorems of this chapter, Bonnet-Myers and Cartan-Hadamard, are prototypes of <strong>comparison geometry</strong>: controlling geometry and topology using curvature bounds.</p>

<h3>What Comes Next</h3>

<p>Chapter 19 will develop comparison geometry systematically. The ideas from this chapter generalize in several directions:</p>

<ul>
    <li><strong>Rauch comparison theorem:</strong> If the sectional curvatures of \\(M\\) are bounded between \\(\\delta\\) and \\(\\Delta\\), then the Jacobi fields of \\(M\\) are bounded between those of the constant-curvature spaces \\(M_\\delta\\) and \\(M_\\Delta\\). This is the quantitative refinement of the qualitative results we proved here.</li>
    <li><strong>Bishop-Gromov volume comparison:</strong> Ricci curvature bounds control volume growth. Positive Ricci curvature forces volume to grow at most polynomially (like a sphere), while negative Ricci allows exponential growth (like hyperbolic space).</li>
    <li><strong>Toponogov comparison:</strong> Triangle comparison theorems that control angles and distances using sectional curvature bounds.</li>
    <li><strong>Morse index theory:</strong> The number of conjugate points along a geodesic (counted with multiplicity) equals the Morse index of the geodesic as a critical point of the energy functional. This connects Jacobi fields to algebraic topology.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">The Curvature Dichotomy</div>
    <div class="env-body">
        <p>This chapter revealed a fundamental dichotomy in Riemannian geometry:</p>
        <table style="width:100%;border-collapse:collapse;margin:12px 0;">
            <thead>
                <tr style="border-bottom:1px solid #30363d;">
                    <th style="text-align:left;padding:6px;"></th>
                    <th style="text-align:left;padding:6px;">\\(K > 0\\) (positive)</th>
                    <th style="text-align:left;padding:6px;">\\(K < 0\\) (negative)</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom:1px solid #1a1a40;">
                    <td style="padding:6px;">Jacobi fields</td>
                    <td style="padding:6px;">oscillate (sin-like)</td>
                    <td style="padding:6px;">grow (sinh-like)</td>
                </tr>
                <tr style="border-bottom:1px solid #1a1a40;">
                    <td style="padding:6px;">Conjugate points</td>
                    <td style="padding:6px;">exist</td>
                    <td style="padding:6px;">none</td>
                </tr>
                <tr style="border-bottom:1px solid #1a1a40;">
                    <td style="padding:6px;">Geodesics</td>
                    <td style="padding:6px;">converge</td>
                    <td style="padding:6px;">diverge</td>
                </tr>
                <tr style="border-bottom:1px solid #1a1a40;">
                    <td style="padding:6px;">Topology</td>
                    <td style="padding:6px;">compact, finite \\(\\pi_1\\)</td>
                    <td style="padding:6px;">universal cover \\(\\cong \\mathbb{R}^n\\)</td>
                </tr>
                <tr>
                    <td style="padding:6px;">Paradigm</td>
                    <td style="padding:6px;">sphere \\(S^n\\)</td>
                    <td style="padding:6px;">hyperbolic \\(\\mathbb{H}^n\\)</td>
                </tr>
            </tbody>
        </table>
        <p>This dichotomy, and the comparison techniques that interpolate between these extremes, is the foundation of modern Riemannian geometry.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-cartan-hadamard"></div>
`,
            visualizations: [
                {
                    id: 'viz-cartan-hadamard',
                    title: 'Cartan-Hadamard: exp_p as Covering Map',
                    description: 'In nonpositive curvature, the exponential map \\(\\exp_p: T_pM \\to M\\) is a covering map. For simply connected manifolds, it is a diffeomorphism to \\(\\mathbb{R}^n\\). This visualization shows geodesics from a point in the Poincare disk model of \\(\\mathbb{H}^2\\), illustrating how \\(\\exp_p\\) maps rays in \\(T_pM\\) to geodesics that never refocus.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 140
                        });

                        var numRays = 16;
                        var time = 0;

                        viz.animate(function(t) {
                            time = (t % 10000) / 10000;
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Poincar\u00E9 Disk Model of \u210D\u00B2: geodesics from center', viz.width / 2, 18, viz.colors.white, 13);

                            // Draw Poincare disk boundary
                            var diskR = 1.0;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, diskR * viz.scale, 0, Math.PI * 2);
                            ctx.stroke();

                            // In the Poincare disk, geodesics from the center are straight lines (diameters)
                            // Draw geodesic rays from center
                            var maxR = 0.05 + time * 0.93;

                            for (var i = 0; i < numRays; i++) {
                                var angle = (i / numRays) * Math.PI * 2;
                                var dx = Math.cos(angle);
                                var dy = Math.sin(angle);

                                var col = (i % 4 === 0) ? viz.colors.teal : viz.colors.teal + '55';
                                var lw = (i % 4 === 0) ? 2 : 1;

                                ctx.strokeStyle = col;
                                ctx.lineWidth = lw;
                                ctx.beginPath();

                                // Draw ray from center to maxR
                                var sx1 = viz.originX;
                                var sy1 = viz.originY;
                                var sx2 = viz.originX + dx * maxR * viz.scale;
                                var sy2 = viz.originY - dy * maxR * viz.scale;
                                ctx.moveTo(sx1, sy1);
                                ctx.lineTo(sx2, sy2);
                                ctx.stroke();

                                // Endpoint dot
                                ctx.fillStyle = col;
                                ctx.beginPath();
                                ctx.arc(sx2, sy2, 2, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Center point
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, 5, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('p', viz.originX - 12, viz.originY - 8, viz.colors.white, 12);

                            // Draw concentric "circles" in Poincare disk (constant hyperbolic distance)
                            // In Poincare model, hyperbolic circle of radius r centered at origin is Euclidean circle of radius tanh(r/2)
                            for (var k = 1; k <= 5; k++) {
                                var hypR = k * 0.6;
                                var eucR = Math.tanh(hypR / 2);
                                if (eucR > maxR + 0.05) continue;
                                ctx.strokeStyle = viz.colors.grid + '66';
                                ctx.lineWidth = 0.8;
                                ctx.beginPath();
                                ctx.arc(viz.originX, viz.originY, eucR * viz.scale, 0, Math.PI * 2);
                                ctx.stroke();
                            }

                            // Right panel: T_pM
                            var rpx = 430, rpy = 50, rpW = 100;
                            ctx.strokeStyle = viz.colors.axis + '44';
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.arc(rpx + rpW / 2, rpy + rpW / 2, rpW / 2, 0, Math.PI * 2);
                            ctx.stroke();

                            // Rays in T_pM (just straight rays)
                            for (var j = 0; j < numRays; j++) {
                                var a2 = (j / numRays) * Math.PI * 2;
                                ctx.strokeStyle = viz.colors.orange + '66';
                                ctx.lineWidth = 0.8;
                                ctx.beginPath();
                                ctx.moveTo(rpx + rpW / 2, rpy + rpW / 2);
                                ctx.lineTo(rpx + rpW / 2 + Math.cos(a2) * rpW / 2 * maxR, rpy + rpW / 2 - Math.sin(a2) * rpW / 2 * maxR);
                                ctx.stroke();
                            }

                            viz.screenText('T\u209AM', rpx + rpW / 2, rpy - 8, viz.colors.orange, 11);
                            viz.screenText('exp\u209A', (rpx - 10 + viz.originX + diskR * viz.scale + 10) / 2, rpy + rpW / 2 - 10, viz.colors.yellow, 11);

                            // Arrow from T_pM panel to disk
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(rpx - 5, rpy + rpW / 2);
                            ctx.lineTo(viz.originX + diskR * viz.scale + 15, rpy + rpW / 2);
                            ctx.stroke();
                            // arrowhead
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.moveTo(viz.originX + diskR * viz.scale + 15, rpy + rpW / 2);
                            ctx.lineTo(viz.originX + diskR * viz.scale + 25, rpy + rpW / 2 - 4);
                            ctx.lineTo(viz.originX + diskR * viz.scale + 25, rpy + rpW / 2 + 4);
                            ctx.closePath();
                            ctx.fill();

                            viz.screenText('No conjugate points: geodesics never refocus.', viz.width / 2, viz.height - 30, viz.colors.purple, 11);
                            viz.screenText('exp\u209A: T\u209AM \u2192 \u210D\u00B2 is a diffeomorphism (simply connected).', viz.width / 2, viz.height - 12, viz.colors.text, 10);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Summarize the relationship between the sign of sectional curvature, the behavior of Jacobi fields, and the existence of conjugate points.',
                    hint: 'Organize your answer around the three cases \\(K > 0\\), \\(K = 0\\), \\(K < 0\\) and the Jacobi field solutions in each case.',
                    solution: 'For constant curvature \\(K\\) with \\(J(0) = 0\\): (1) \\(K > 0\\): \\(|J(t)| = \\sin(\\sqrt{K}t)/\\sqrt{K}\\), oscillatory, first conjugate at \\(t = \\pi/\\sqrt{K}\\). Geodesics converge (Bonnet-Myers). (2) \\(K = 0\\): \\(|J(t)| = t\\), linear growth, no conjugate points. Geodesics neither converge nor diverge (Euclidean). (3) \\(K < 0\\): \\(|J(t)| = \\sinh(\\sqrt{|K|}t)/\\sqrt{|K|}\\), exponential growth, no conjugate points. Geodesics diverge (Cartan-Hadamard). The curvature term \\(R(J, \\dot{\\gamma})\\dot{\\gamma}\\) acts like a "restoring force" for \\(K > 0\\) and a "repelling force" for \\(K < 0\\).'
                },
                {
                    question: 'Can a compact manifold have nonpositive sectional curvature?',
                    hint: 'Cartan-Hadamard says the universal cover is \\(\\mathbb{R}^n\\), but the manifold itself does not have to be simply connected. Think of quotients.',
                    solution: 'Yes. The flat torus \\(T^n = \\mathbb{R}^n / \\mathbb{Z}^n\\) is compact with \\(K = 0\\). Closed surfaces of genus \\(g \\geq 2\\) are compact with \\(K = -1\\). By Cartan-Hadamard, their universal covers are \\(\\mathbb{R}^n\\) and \\(\\mathbb{H}^2\\) respectively, both non-compact. The manifold itself is a quotient by a discrete group of isometries, which can be compact. Bonnet-Myers only forbids compact manifolds from having <em>positive</em> Ricci curvature bounded away from zero, so there is no contradiction.'
                }
            ]
        }
    ]
});
