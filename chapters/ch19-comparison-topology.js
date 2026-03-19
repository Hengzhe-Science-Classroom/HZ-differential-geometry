window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch19',
    number: 19,
    title: 'Comparison Theorems & Topology',
    subtitle: 'How curvature controls topology',
    sections: [
        // ================================================================
        // SECTION 1: Curvature Determines Topology
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Curvature Determines Topology',
            content: `
<h2>Curvature Determines Topology</h2>

<div class="env-block intuition">
    <div class="env-title">The Grand Theme</div>
    <div class="env-body">
        <p>Throughout this course, we have encountered a persistent whisper: <strong>curvature controls shape</strong>. The Gauss-Bonnet theorem told us that total Gaussian curvature determines the Euler characteristic of a surface. Jacobi fields showed us that curvature governs how nearby geodesics spread apart or come together. This final chapter turns that whisper into a theorem, or rather a symphony of theorems, each saying: <em>if you bound the curvature, you constrain the topology.</em></p>
    </div>
</div>

<p>The passage from local to global is the deepest theme in differential geometry. Curvature is a <strong>local</strong> invariant: it is computed from the metric and its derivatives at a single point. Topology is <strong>global</strong>: it captures the overall shape of a manifold, properties invariant under continuous deformations. The comparison theorems we study here bridge this gap with extraordinary precision.</p>

<h3>Three Levels of Control</h3>

<p>Curvature bounds constrain geometry and topology at three levels, each more powerful than the last:</p>

<ol>
    <li><strong>Jacobi field comparison</strong> (Rauch): bounding sectional curvature controls how fast geodesics diverge, and hence the behavior of the exponential map.</li>
    <li><strong>Triangle comparison</strong> (Toponogov): curvature bounds force geodesic triangles to be "fatter" or "thinner" than their counterparts in spaces of constant curvature.</li>
    <li><strong>Volume comparison</strong> (Bishop-Gromov): Ricci curvature bounds control the growth rate of volumes of geodesic balls.</li>
</ol>

<p>These results culminate in global topological conclusions. The sphere theorem tells us that a sufficiently pinched manifold must be homeomorphic to a sphere. Ricci flow, the most powerful technique in this program, proved the Poincare conjecture by deforming geometry until topology becomes transparent.</p>

<h3>The Model Spaces</h3>

<p>Throughout this chapter, we compare a general Riemannian manifold \\((M, g)\\) against <strong>model spaces</strong> of constant sectional curvature \\(\\kappa\\):</p>

<ul>
    <li>\\(\\kappa > 0\\): the sphere \\(S^n(1/\\sqrt{\\kappa})\\) of radius \\(1/\\sqrt{\\kappa}\\)</li>
    <li>\\(\\kappa = 0\\): Euclidean space \\(\\mathbb{R}^n\\)</li>
    <li>\\(\\kappa < 0\\): hyperbolic space \\(H^n(1/\\sqrt{|\\kappa|})\\)</li>
</ul>

<p>In the model space \\(M_\\kappa^n\\), the Jacobi field along any geodesic with initial conditions \\(J(0) = 0\\), \\(|J'(0)| = 1\\) is given by</p>

\\[
|J(t)| = s_\\kappa(t), \\quad \\text{where} \\quad s_\\kappa(t) = \\begin{cases} \\frac{1}{\\sqrt{\\kappa}} \\sin(\\sqrt{\\kappa}\\, t) & \\kappa > 0, \\\\ t & \\kappa = 0, \\\\ \\frac{1}{\\sqrt{|\\kappa|}} \\sinh(\\sqrt{|\\kappa|}\\, t) & \\kappa < 0. \\end{cases}
\\]

<p>This function \\(s_\\kappa(t)\\) is the universal yardstick against which we measure all comparison results.</p>

<div class="env-block remark">
    <div class="env-title">Historical Arc</div>
    <div class="env-body">
        <p>The comparison program in Riemannian geometry developed over several decades. Rauch's 1951 theorem was the first major result. Toponogov's 1959 triangle comparison theorem provided a more geometric and flexible tool. Bishop and Gromov's volume comparison emerged in the 1960s. The sphere theorem was conjectured by Rauch and proved by Berger and Klingenberg in the early 1960s. The ultimate triumph came with Perelman's 2003 proof of the Poincare conjecture using Hamilton's Ricci flow, completing a century-long program connecting curvature to topology.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Rauch Comparison Theorem
        // ================================================================
        {
            id: 'sec-rauch',
            title: 'Rauch Comparison Theorem',
            content: `
<h2>Rauch Comparison Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">The Core Idea</div>
    <div class="env-body">
        <p>Imagine spreading a fan of geodesics from a point. On a sphere (positive curvature), the geodesics converge back together. On a saddle (negative curvature), they spread apart faster than in flat space. The Rauch comparison theorem makes this precise: if the sectional curvature of \\(M\\) is bounded above (or below) by \\(\\kappa\\), then Jacobi fields on \\(M\\) are bounded below (or above) by those in the model space \\(M_\\kappa\\).</p>
    </div>
</div>

<h3>Setup</h3>

<p>Let \\(\\gamma: [0, L] \\to M\\) be a geodesic in \\((M^n, g)\\), and let \\(\\bar{\\gamma}: [0, L] \\to M_\\kappa^n\\) be a geodesic in the model space of constant curvature \\(\\kappa\\). Let \\(J\\) be a Jacobi field along \\(\\gamma\\) with \\(J(0) = 0\\), and let \\(\\bar{J}\\) be a Jacobi field along \\(\\bar{\\gamma}\\) with \\(\\bar{J}(0) = 0\\) and \\(|\\bar{J}'(0)| = |J'(0)|\\). Both fields are assumed orthogonal to their respective geodesics.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 19.1 (Rauch Comparison)</div>
    <div class="env-body">
        <p>Suppose the sectional curvatures of \\(M\\) satisfy \\(K_M \\leq \\kappa\\) along \\(\\gamma\\). If \\(\\bar{J}\\) has no zeros on \\((0, L]\\) (equivalently, \\(L < \\pi/\\sqrt{\\kappa}\\) when \\(\\kappa > 0\\)), then for all \\(t \\in (0, L]\\):</p>
        \\[|J(t)| \\geq |\\bar{J}(t)| = |J'(0)| \\cdot s_\\kappa(t).\\]
        <p>If instead \\(K_M \\geq \\kappa\\), then \\(|J(t)| \\leq |\\bar{J}(t)|\\) on \\((0, L]\\) (provided \\(J\\) has no zeros on this interval).</p>
    </div>
</div>

<p>In words: <strong>less curvature means more spreading</strong>. If \\(M\\) curves less than the model space (\\(K_M \\leq \\kappa\\)), then geodesics in \\(M\\) spread at least as fast as in \\(M_\\kappa\\).</p>

<h3>The Proof Idea: Sturm Comparison</h3>

<p>The proof rests on the <em>Sturm comparison theorem</em> from ODE theory. The key quantity is \\(f(t) = |J(t)|\\), which satisfies the Riccati-type inequality</p>

\\[
f''(t) + K(t) \\, f(t) \\leq 0,
\\]

<p>where \\(K(t)\\) is the sectional curvature of the plane spanned by \\(\\gamma'(t)\\) and \\(J(t)\\). In the model space, we have equality with \\(K(t) = \\kappa\\). When \\(K(t) \\leq \\kappa\\), the ODE comparison principle gives \\(f(t) \\geq \\bar{f}(t)\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition (Index Form)</div>
    <div class="env-body">
        <p>For vector fields \\(V, W\\) along \\(\\gamma\\) that vanish at the endpoints, the <strong>index form</strong> is</p>
        \\[I(V, W) = \\int_0^L \\left[ \\langle V', W' \\rangle - \\langle R(V, \\gamma')\\gamma', W \\rangle \\right] dt.\\]
        <p>The index form is the second variation of arc length. Its sign controls whether geodesics are locally minimizing, and the Rauch theorem can be proved via the index form.</p>
    </div>
</div>

<h3>Consequences</h3>

<div class="env-block theorem">
    <div class="env-title">Corollary 19.2 (Conjugate Point Comparison)</div>
    <div class="env-body">
        <p>If \\(K_M \\geq \\kappa > 0\\), then the first conjugate point along any geodesic occurs at distance \\(\\leq \\pi/\\sqrt{\\kappa}\\). In particular, the diameter of \\(M\\) satisfies \\(\\operatorname{diam}(M) \\leq \\pi/\\sqrt{\\kappa}\\).</p>
    </div>
</div>

<p>This is the <strong>Bonnet-Myers theorem</strong> (for sectional curvature). It says that positive curvature forces the manifold to be compact with bounded diameter.</p>

<div class="env-block example">
    <div class="env-title">Example: The Round Sphere</div>
    <div class="env-body">
        <p>On \\(S^n(r)\\) with sectional curvature \\(\\kappa = 1/r^2\\), the Jacobi field is \\(J(t) = r\\sin(t/r)\\). The first conjugate point is at \\(t = \\pi r\\), which is the antipodal point. The diameter is exactly \\(\\pi r = \\pi/\\sqrt{\\kappa}\\), so the Bonnet-Myers bound is sharp.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-rauch-comparison"></div>
`,
            visualizations: [
                {
                    id: 'viz-rauch-comparison',
                    title: 'Rauch Comparison: Jacobi Fields in Different Curvatures',
                    description: 'Compare Jacobi fields (geodesic deviation) in positive curvature (sphere), zero curvature (flat), and negative curvature (hyperbolic). Adjust the curvature to see how geodesics spread faster or slower.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 60, originY: 320, scale: 80
                        });

                        var kappa = 1.0;
                        VizEngine.createSlider(controls, '\u03ba (curvature)', -2, 3, kappa, 0.1, function(v) {
                            kappa = v; draw();
                        });

                        function sKappa(t, k) {
                            if (Math.abs(k) < 1e-6) return t;
                            if (k > 0) {
                                var sq = Math.sqrt(k);
                                return Math.sin(sq * t) / sq;
                            }
                            var sq2 = Math.sqrt(-k);
                            return Math.sinh(sq2 * t) / sq2;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Title
                            viz.screenText('Jacobi Field Magnitude |J(t)| = s\u2096(t)', viz.width / 2, 18, viz.colors.white, 14);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(60, 320); ctx.lineTo(540, 320); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(60, 320); ctx.lineTo(60, 20); ctx.stroke();

                            // Axis labels
                            viz.screenText('t', 540, 335, viz.colors.text, 12);
                            viz.screenText('|J(t)|', 30, 20, viz.colors.text, 12);

                            // Tick marks on t axis
                            for (var tick = 1; tick <= 5; tick++) {
                                var tx = 60 + tick * 80;
                                ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(tx, 20); ctx.lineTo(tx, 320); ctx.stroke();
                                viz.screenText(tick.toString(), tx, 335, viz.colors.text, 10);
                            }

                            // Draw three reference curves
                            var tMax = 5.5;
                            var curvatures = [
                                { k: 1, color: viz.colors.blue, label: '\u03ba=1 (sphere)' },
                                { k: 0, color: viz.colors.white, label: '\u03ba=0 (flat)' },
                                { k: -1, color: viz.colors.orange, label: '\u03ba=-1 (hyp.)' }
                            ];

                            for (var ci = 0; ci < curvatures.length; ci++) {
                                var c = curvatures[ci];
                                ctx.strokeStyle = c.color; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= 300; i++) {
                                    var t = i * tMax / 300;
                                    var val = sKappa(t, c.k);
                                    if (!isFinite(val) || val < -0.5 || val > 4) { started = false; continue; }
                                    var sx = 60 + t * 80;
                                    var sy = 320 - val * 80;
                                    if (sy < 10) { started = false; continue; }
                                    if (!started) { ctx.moveTo(sx, sy); started = true; } else { ctx.lineTo(sx, sy); }
                                }
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            // Draw the user-controlled curvature
                            ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 3;
                            ctx.beginPath();
                            var started2 = false;
                            for (var j = 0; j <= 400; j++) {
                                var t2 = j * tMax / 400;
                                var val2 = sKappa(t2, kappa);
                                if (!isFinite(val2) || val2 < -0.5 || val2 > 4) { started2 = false; continue; }
                                var sx2 = 60 + t2 * 80;
                                var sy2 = 320 - val2 * 80;
                                if (sy2 < 10) { started2 = false; continue; }
                                if (!started2) { ctx.moveTo(sx2, sy2); started2 = true; } else { ctx.lineTo(sx2, sy2); }
                            }
                            ctx.stroke();

                            // Legend
                            var ly = 50;
                            for (var li = 0; li < curvatures.length; li++) {
                                ctx.setLineDash([4, 4]);
                                ctx.strokeStyle = curvatures[li].color; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(380, ly + li * 20); ctx.lineTo(410, ly + li * 20); ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText(curvatures[li].label, 415, ly + li * 20, curvatures[li].color, 11, 'left');
                            }
                            ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(380, ly + 60); ctx.lineTo(410, ly + 60); ctx.stroke();
                            viz.screenText('\u03ba=' + kappa.toFixed(1) + ' (you)', 415, ly + 60, viz.colors.teal, 11, 'left');

                            // Annotation
                            if (kappa > 0.01) {
                                var conjPt = Math.PI / Math.sqrt(kappa);
                                if (conjPt < tMax) {
                                    var cx = 60 + conjPt * 80;
                                    ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
                                    ctx.beginPath(); ctx.moveTo(cx, 20); ctx.lineTo(cx, 320); ctx.stroke();
                                    ctx.setLineDash([]);
                                    viz.screenText('conj. pt', cx, 340, viz.colors.red, 9);
                                }
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\((M^n, g)\\) have sectional curvature \\(K \\geq 1\\). Show that the first conjugate point along any geodesic occurs at distance \\(\\leq \\pi\\). What does this say about the diameter of \\(M\\)?',
                    hint: 'Use the Rauch comparison with \\(\\kappa = 1\\). In the model space \\(S^n(1)\\), the Jacobi field vanishes at \\(t = \\pi\\).',
                    solution: 'By the Rauch comparison theorem (upper bound version), since \\(K_M \\geq 1 = \\kappa\\), we have \\(|J(t)| \\leq s_1(t) = \\sin t\\). Since \\(s_1(\\pi) = 0\\), the Jacobi field in \\(M\\) must vanish at or before \\(t = \\pi\\), so the first conjugate point is at distance \\(\\leq \\pi\\). By Bonnet-Myers, \\(\\operatorname{diam}(M) \\leq \\pi\\), and \\(M\\) is compact with finite fundamental group.'
                },
                {
                    question: 'Consider a surface with Gaussian curvature \\(K \\leq -1\\) everywhere. Describe qualitatively how geodesics emanating from a point behave compared to the hyperbolic plane \\(H^2\\).',
                    hint: 'Apply the Rauch theorem with \\(\\kappa = -1\\). Which direction does the inequality go?',
                    solution: 'Since \\(K_M \\leq -1 = \\kappa\\), the Rauch comparison gives \\(|J(t)| \\geq s_{-1}(t) = \\sinh t\\). Geodesics in \\(M\\) spread apart <em>at least as fast</em> as in the hyperbolic plane. There are no conjugate points (since \\(\\sinh t > 0\\) for \\(t > 0\\)), the exponential map is a local diffeomorphism everywhere, and \\(M\\) is diffeomorphic to \\(\\mathbb{R}^2\\) (Hadamard-Cartan theorem).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Toponogov's Theorem
        // ================================================================
        {
            id: 'sec-toponogov',
            title: "Toponogov's Theorem",
            content: `
<h2>Toponogov's Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">From Jacobi Fields to Triangles</div>
    <div class="env-body">
        <p>The Rauch theorem controls infinitesimal deviation (Jacobi fields). Toponogov's theorem upgrades this to a <strong>global</strong> statement about geodesic triangles. It says: if you draw a triangle on \\(M\\) with geodesic sides, you can compare its angles and side lengths to those of a triangle with the same side lengths drawn in a space of constant curvature.</p>
    </div>
</div>

<h3>Geodesic Triangles</h3>

<p>A <strong>geodesic triangle</strong> \\(\\triangle pqr\\) in \\(M\\) consists of three points \\(p, q, r \\in M\\) and minimizing geodesic segments connecting them. The angle at vertex \\(p\\) is the angle between the initial tangent vectors of the geodesics \\(pq\\) and \\(pr\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition (Comparison Triangle)</div>
    <div class="env-body">
        <p>Given a geodesic triangle \\(\\triangle pqr\\) in \\(M\\) with side lengths \\(a = d(q,r)\\), \\(b = d(p,r)\\), \\(c = d(p,q)\\), a <strong>comparison triangle</strong> \\(\\triangle \\bar{p}\\bar{q}\\bar{r}\\) in the model space \\(M_\\kappa^2\\) is a triangle with the same side lengths: \\(d(\\bar{q},\\bar{r}) = a\\), \\(d(\\bar{p},\\bar{r}) = b\\), \\(d(\\bar{p},\\bar{q}) = c\\).</p>
        <p>Such a triangle exists and is unique (up to isometry) in \\(M_\\kappa^2\\) whenever the perimeter \\(a + b + c < 2\\pi/\\sqrt{\\kappa}\\) (when \\(\\kappa > 0\\)).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 19.3 (Toponogov's Comparison Theorem)</div>
    <div class="env-body">
        <p>Let \\((M^n, g)\\) be a complete Riemannian manifold with sectional curvature \\(K \\geq \\kappa\\).</p>
        <p><strong>(A) Angle version:</strong> For any geodesic triangle \\(\\triangle pqr\\) in \\(M\\) and its comparison triangle \\(\\triangle \\bar{p}\\bar{q}\\bar{r}\\) in \\(M_\\kappa^2\\),</p>
        \\[\\angle_p \\leq \\bar{\\angle}_p, \\quad \\angle_q \\leq \\bar{\\angle}_q, \\quad \\angle_r \\leq \\bar{\\angle}_r.\\]
        <p><strong>(B) Hinge version:</strong> Given two geodesic segments from \\(p\\) with lengths \\(b, c\\) and angle \\(\\alpha\\) between them, if \\(\\bar{p}\\) is a point in \\(M_\\kappa^2\\) with two geodesic segments of the same lengths and angle, then</p>
        \\[d(q, r) \\leq d(\\bar{q}, \\bar{r}).\\]
    </div>
</div>

<p>In plain language: <strong>positive curvature makes triangles fatter</strong>. When \\(K \\geq \\kappa > 0\\), the angles of a triangle in \\(M\\) are <em>at most</em> as large as the corresponding angles in the model space. Since the model space already has "fat" triangles (think of the sphere, where angle sums exceed \\(\\pi\\)), the manifold's triangles are at most as fat.</p>

<p>Equivalently, given a hinge (two sides and the included angle), the opposite side in \\(M\\) is <em>shorter</em> than in the model space. Curvature bends geodesics inward.</p>

<div class="env-block example">
    <div class="env-title">Example: Triangles on the Sphere</div>
    <div class="env-body">
        <p>On \\(S^2(1)\\) with \\(\\kappa = 1\\), consider the geodesic triangle with vertices at the north pole, the point \\((\\pi/2, 0)\\) on the equator, and \\((\\pi/2, \\pi/2)\\) on the equator. Each side has length \\(\\pi/2\\), so it is an equilateral triangle. By the spherical law of cosines, each angle is \\(\\pi/2\\) (not \\(\\pi/3\\) as in flat space). The angle sum is \\(3\\pi/2 > \\pi\\), confirming the "fatter" property.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-triangle-comparison"></div>

<h3>Applications of Toponogov</h3>

<div class="env-block theorem">
    <div class="env-title">Corollary 19.4 (Diameter Rigidity)</div>
    <div class="env-body">
        <p>If \\((M^n, g)\\) is complete with \\(K \\geq 1\\) and \\(\\operatorname{diam}(M) = \\pi\\), then \\(M\\) is isometric to \\(S^n(1)\\).</p>
    </div>
</div>

<p>This is Cheng's maximal diameter theorem. Together with Bonnet-Myers (\\(\\operatorname{diam} \\leq \\pi/\\sqrt{\\kappa}\\)), it provides a complete picture: the sphere is the <em>only</em> manifold that achieves the maximal diameter allowed by positive curvature.</p>
`,
            visualizations: [
                {
                    id: 'viz-triangle-comparison',
                    title: 'Triangle Comparison: Sphere vs. Plane vs. Hyperbolic',
                    description: 'Compare geodesic triangles with the same side lengths drawn on a sphere (positive curvature), the Euclidean plane (zero curvature), and the hyperbolic plane (negative curvature). Observe how angles change: larger on the sphere, smaller on the saddle.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 280, originY: 180, scale: 1
                        });

                        var sideLen = 1.5;
                        VizEngine.createSlider(controls, 'Side length', 0.5, 2.5, sideLen, 0.1, function(v) {
                            sideLen = v; draw();
                        });

                        function lawOfCosAngle(a, b, c, kappa) {
                            // Compute angle at vertex opposite side a, given sides b, c
                            if (Math.abs(kappa) < 1e-8) {
                                // Euclidean law of cosines
                                var cosA = (b * b + c * c - a * a) / (2 * b * c);
                                return Math.acos(Math.max(-1, Math.min(1, cosA)));
                            }
                            if (kappa > 0) {
                                var sk = Math.sqrt(kappa);
                                var cosA2 = (Math.cos(sk * a) - Math.cos(sk * b) * Math.cos(sk * c)) / (Math.sin(sk * b) * Math.sin(sk * c));
                                return Math.acos(Math.max(-1, Math.min(1, cosA2)));
                            }
                            var sk2 = Math.sqrt(-kappa);
                            var cosA3 = (Math.cosh(sk2 * b) * Math.cosh(sk2 * c) - Math.cosh(sk2 * a)) / (Math.sinh(sk2 * b) * Math.sinh(sk2 * c));
                            return Math.acos(Math.max(-1, Math.min(1, cosA3)));
                        }

                        function drawTrianglePanel(cx, cy, kappa, label, colorMain) {
                            var ctx = viz.ctx;
                            var a = sideLen, b = sideLen, c = sideLen;

                            // Compute angles via law of cosines in space of curvature kappa
                            var angleA = lawOfCosAngle(a, b, c, kappa);
                            var angleB = lawOfCosAngle(b, a, c, kappa);

                            // Draw an equilateral-ish triangle in screen coords
                            // Place first vertex at bottom-left, second at bottom-right
                            var drawScale = 55;
                            var x0 = cx - c * drawScale / 2;
                            var y0 = cy + 30;
                            var x1 = cx + c * drawScale / 2;
                            var y1 = y0;
                            // Third vertex from angle at vertex 0
                            var x2 = x0 + b * drawScale * Math.cos(angleA);
                            var y2 = y0 - b * drawScale * Math.sin(angleA);

                            // Draw filled triangle
                            ctx.fillStyle = colorMain + '22';
                            ctx.beginPath();
                            ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2);
                            ctx.closePath(); ctx.fill();

                            ctx.strokeStyle = colorMain; ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2);
                            ctx.closePath(); ctx.stroke();

                            // Draw vertices
                            ctx.fillStyle = colorMain;
                            ctx.beginPath(); ctx.arc(x0, y0, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(x1, y1, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(x2, y2, 4, 0, Math.PI * 2); ctx.fill();

                            // Angle arcs at vertex 0
                            ctx.strokeStyle = viz.colors.yellow; ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.arc(x0, y0, 15, -angleA, 0);
                            ctx.stroke();

                            // Label
                            viz.screenText(label, cx, cy - 75, viz.colors.white, 13);

                            // Angle sum
                            var angleSum = angleA + angleB + lawOfCosAngle(c, a, b, kappa);
                            viz.screenText('\u2211\u2220 = ' + (angleSum * 180 / Math.PI).toFixed(1) + '\u00b0', cx, cy + 70, viz.colors.yellow, 11);

                            // Angle at vertex
                            viz.screenText('\u2220 = ' + (angleA * 180 / Math.PI).toFixed(1) + '\u00b0', x0 - 5, y0 + 15, viz.colors.text, 10, 'right');
                        }

                        function draw() {
                            viz.clear();
                            viz.screenText("Toponogov's Triangle Comparison", viz.width / 2, 16, viz.colors.white, 14);

                            // Three panels
                            drawTrianglePanel(100, 190, 1.0, 'Sphere (\u03ba=1)', viz.colors.blue);
                            drawTrianglePanel(280, 190, 0.0, 'Euclidean (\u03ba=0)', viz.colors.white);
                            drawTrianglePanel(460, 190, -1.0, 'Hyperbolic (\u03ba=-1)', viz.colors.orange);

                            // Summary
                            viz.screenText('Same side lengths, different angles: positive curvature \u2192 bigger angles', viz.width / 2, 345, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'On a complete manifold with \\(K \\geq 0\\), show using Toponogov that for any geodesic triangle with sides \\(a, b, c\\) and angle \\(\\alpha\\) opposite side \\(a\\), we have \\(a^2 \\leq b^2 + c^2 - 2bc\\cos\\alpha\\).',
                    hint: 'Compare with a Euclidean triangle having the same sides. What does Toponogov say about the angles?',
                    solution: 'By Toponogov (angle version) with \\(\\kappa = 0\\), the angles in \\(M\\) are \\(\\leq\\) the corresponding Euclidean angles. Let \\(\\bar{\\alpha}\\) be the Euclidean angle opposite \\(a\\). Then \\(\\alpha \\leq \\bar{\\alpha}\\), so \\(\\cos\\alpha \\geq \\cos\\bar{\\alpha}\\) (cosine is decreasing on \\([0,\\pi]\\)). By the Euclidean law of cosines, \\(a^2 = b^2 + c^2 - 2bc\\cos\\bar{\\alpha} \\leq b^2 + c^2 - 2bc\\cos\\alpha\\). Wait, that gives the reverse. Let me reconsider. Actually, by the hinge version: given the hinge with sides \\(b, c\\) and angle \\(\\alpha\\), the opposite side \\(a\\) in \\(M\\) satisfies \\(a \\leq \\bar{a}\\) where \\(\\bar{a}\\) is the opposite side in Euclidean space with same hinge. So \\(a^2 \\leq \\bar{a}^2 = b^2 + c^2 - 2bc\\cos\\alpha\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Volume Comparison
        // ================================================================
        {
            id: 'sec-volume',
            title: 'Volume Comparison',
            content: `
<h2>Volume Comparison</h2>

<div class="env-block intuition">
    <div class="env-title">How Fast Do Balls Grow?</div>
    <div class="env-body">
        <p>In Euclidean space, the volume of a ball of radius \\(r\\) grows as \\(r^n\\). On a sphere, balls grow more slowly (the surface curves inward). In hyperbolic space, they grow exponentially fast. The Bishop-Gromov comparison theorem makes this precise using <strong>Ricci curvature</strong>, a weaker condition than sectional curvature.</p>
    </div>
</div>

<h3>From Sectional to Ricci</h3>

<p>Recall that the <strong>Ricci curvature</strong> \\(\\operatorname{Ric}(v, v)\\) is the trace of the sectional curvature: for a unit vector \\(v\\),</p>

\\[
\\operatorname{Ric}(v, v) = \\sum_{i=1}^{n-1} K(v, e_i),
\\]

<p>where \\(\\{e_1, \\ldots, e_{n-1}, v\\}\\) is an orthonormal basis. A lower bound \\(K \\geq \\kappa\\) on sectional curvature implies \\(\\operatorname{Ric} \\geq (n-1)\\kappa\\), but the Ricci bound is strictly weaker and applies to many more manifolds.</p>

<h3>The Volume of Geodesic Balls in Model Spaces</h3>

<p>In the model space \\(M_\\kappa^n\\), the volume of a geodesic ball of radius \\(r\\) is</p>

\\[
V_\\kappa(r) = n\\omega_n \\int_0^r s_\\kappa(t)^{n-1} \\, dt,
\\]

<p>where \\(\\omega_n\\) is the volume of the unit ball in \\(\\mathbb{R}^n\\) and \\(s_\\kappa\\) is the Jacobi field magnitude from Section 1.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 19.5 (Bishop-Gromov Volume Comparison)</div>
    <div class="env-body">
        <p>Let \\((M^n, g)\\) be a complete Riemannian manifold with \\(\\operatorname{Ric} \\geq (n-1)\\kappa\\). For any \\(p \\in M\\), the ratio</p>
        \\[\\frac{\\operatorname{Vol}(B_r(p))}{V_\\kappa(r)}\\]
        <p>is a <strong>non-increasing</strong> function of \\(r\\). In particular,</p>
        \\[\\operatorname{Vol}(B_r(p)) \\leq V_\\kappa(r) \\quad \\text{for all } r > 0.\\]
    </div>
</div>

<p>The monotonicity of the volume ratio is the key strength: it is much more powerful than a simple upper bound. As \\(r \\to 0\\), the ratio approaches 1 (every manifold is locally Euclidean), and it can only decrease. If it equals 1 at some \\(r_0 > 0\\), then \\(B_{r_0}(p)\\) is isometric to the ball in the model space (rigidity).</p>

<h3>Applications</h3>

<div class="env-block theorem">
    <div class="env-title">Corollary 19.6 (Bonnet-Myers, Ricci Version)</div>
    <div class="env-body">
        <p>If \\(\\operatorname{Ric} \\geq (n-1)\\kappa\\) with \\(\\kappa > 0\\), then \\(M\\) is compact with</p>
        \\[\\operatorname{diam}(M) \\leq \\frac{\\pi}{\\sqrt{\\kappa}}, \\quad |\\pi_1(M)| < \\infty.\\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Corollary 19.7 (Volume Growth)</div>
    <div class="env-body">
        <p>For \\(\\operatorname{Ric} \\geq 0\\), \\(\\operatorname{Vol}(B_r(p)) \\leq \\omega_n r^n\\) (at most Euclidean growth). By a result of Yau, a complete manifold with \\(\\operatorname{Ric} \\geq 0\\) has at least linear volume growth: \\(\\operatorname{Vol}(B_r(p)) \\geq cr\\) for some \\(c > 0\\) and all \\(r\\) large.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-volume-growth"></div>
`,
            visualizations: [
                {
                    id: 'viz-volume-growth',
                    title: 'Volume Growth: Geodesic Balls in Different Curvatures',
                    description: 'Compare how the volume of geodesic balls grows with radius in spaces of different curvature. Positive curvature slows growth; negative curvature accelerates it exponentially.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 70, originY: 340, scale: 1
                        });

                        var dim = 3;
                        VizEngine.createSlider(controls, 'Dimension n', 2, 6, dim, 1, function(v) {
                            dim = Math.round(v); draw();
                        });

                        function sKappa(t, k) {
                            if (Math.abs(k) < 1e-6) return t;
                            if (k > 0) { var s = Math.sqrt(k); return Math.sin(s * t) / s; }
                            var s2 = Math.sqrt(-k); return Math.sinh(s2 * t) / s2;
                        }

                        function volRatio(r, k, n) {
                            // Numerical integration of s_kappa(t)^(n-1) from 0 to r
                            var steps = 200;
                            var dt = r / steps;
                            var sum = 0;
                            for (var i = 0; i < steps; i++) {
                                var t = (i + 0.5) * dt;
                                var s = sKappa(t, k);
                                if (s <= 0) break;
                                sum += Math.pow(s, n - 1) * dt;
                            }
                            return sum;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Volume of Geodesic Balls (n=' + dim + ')', viz.width / 2, 18, viz.colors.white, 14);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(70, 340); ctx.lineTo(540, 340); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(70, 340); ctx.lineTo(70, 30); ctx.stroke();
                            viz.screenText('r', 540, 355, viz.colors.text, 12);
                            viz.screenText('Vol(B_r)', 25, 30, viz.colors.text, 11);

                            var rMax = 3.5;
                            var curvatures = [
                                { k: 1, color: viz.colors.blue, label: '\u03ba=1 (sphere)' },
                                { k: 0, color: viz.colors.white, label: '\u03ba=0 (flat)' },
                                { k: -0.5, color: viz.colors.orange, label: '\u03ba=-0.5 (hyp.)' }
                            ];

                            // Compute max vol for scaling
                            var maxVol = 0;
                            for (var ci = 0; ci < curvatures.length; ci++) {
                                var v = volRatio(rMax, curvatures[ci].k, dim);
                                if (isFinite(v) && v > maxVol) maxVol = v;
                            }
                            if (maxVol < 1) maxVol = 1;
                            var chartH = 290;
                            var chartW = 450;

                            for (var ci2 = 0; ci2 < curvatures.length; ci2++) {
                                var c = curvatures[ci2];
                                ctx.strokeStyle = c.color; ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= 300; i++) {
                                    var r = i * rMax / 300;
                                    var vol = volRatio(r, c.k, dim);
                                    if (!isFinite(vol) || vol < 0) { started = false; continue; }
                                    var sx = 70 + r / rMax * chartW;
                                    var sy = 340 - (vol / maxVol) * chartH;
                                    if (sy < 20) { started = false; continue; }
                                    if (!started) { ctx.moveTo(sx, sy); started = true; } else { ctx.lineTo(sx, sy); }
                                }
                                ctx.stroke();
                            }

                            // Legend
                            var ly = 50;
                            for (var li = 0; li < curvatures.length; li++) {
                                ctx.strokeStyle = curvatures[li].color; ctx.lineWidth = 2.5;
                                ctx.beginPath(); ctx.moveTo(380, ly + li * 22); ctx.lineTo(415, ly + li * 22); ctx.stroke();
                                viz.screenText(curvatures[li].label, 420, ly + li * 22, curvatures[li].color, 11, 'left');
                            }

                            viz.screenText('Positive curvature: volume saturates. Negative: exponential growth.', viz.width / 2, 360, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the Bishop-Gromov theorem to show that a complete manifold with \\(\\operatorname{Ric} \\geq (n-1)\\) has volume at most \\(\\operatorname{Vol}(S^n(1))\\).',
                    hint: 'Set \\(\\kappa = 1\\). What is \\(V_1(r)\\) as \\(r \\to \\pi\\)?',
                    solution: 'With \\(\\kappa = 1\\), the model space is \\(S^n(1)\\). Bishop-Gromov gives \\(\\operatorname{Vol}(B_r(p)) \\leq V_1(r)\\) for all \\(r\\). By Bonnet-Myers, \\(\\operatorname{diam}(M) \\leq \\pi\\), so \\(M = B_\\pi(p)\\). Therefore \\(\\operatorname{Vol}(M) = \\operatorname{Vol}(B_\\pi(p)) \\leq V_1(\\pi) = \\operatorname{Vol}(S^n(1))\\). Equality holds if and only if \\(M\\) is isometric to \\(S^n(1)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: The Sphere Theorem
        // ================================================================
        {
            id: 'sec-sphere',
            title: 'The Sphere Theorem',
            content: `
<h2>The Sphere Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">When Must a Manifold Be a Sphere?</div>
    <div class="env-body">
        <p>We know that the round sphere \\(S^n\\) has constant sectional curvature \\(K = 1\\). But what if we only know that \\(K\\) is <em>close</em> to 1, say between \\(1/4\\) and \\(1\\)? Is the manifold still topologically a sphere? The classical sphere theorem says <strong>yes</strong>.</p>
    </div>
</div>

<h3>Pinching</h3>

<div class="env-block definition">
    <div class="env-title">Definition (\\(\\delta\\)-Pinched)</div>
    <div class="env-body">
        <p>A Riemannian manifold \\((M^n, g)\\) is <strong>\\(\\delta\\)-pinched</strong> if there exists \\(\\kappa > 0\\) such that</p>
        \\[\\delta \\kappa \\leq K \\leq \\kappa\\]
        <p>for all sectional curvatures \\(K\\). By rescaling the metric, we may assume \\(\\kappa = 1\\), so the condition becomes \\(\\delta \\leq K \\leq 1\\).</p>
    </div>
</div>

<p>The question is: how small can \\(\\delta\\) be and still force the manifold to be a sphere?</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 19.8 (The Classical Sphere Theorem, Berger-Klingenberg 1961)</div>
    <div class="env-body">
        <p>Let \\((M^n, g)\\) be a complete, simply connected Riemannian manifold with</p>
        \\[\\frac{1}{4} < K \\leq 1.\\]
        <p>Then \\(M\\) is homeomorphic to \\(S^n\\).</p>
    </div>
</div>

<p>The \\(1/4\\) is sharp: the complex projective space \\(\\mathbb{CP}^n\\) has sectional curvatures between \\(1/4\\) and \\(1\\), and it is <em>not</em> homeomorphic to a sphere. So \\(1/4\\)-pinching is the critical threshold.</p>

<h3>Proof Strategy</h3>

<p>The proof uses Toponogov's theorem in a beautiful way:</p>

<ol>
    <li><strong>Find two "poles":</strong> Choose \\(p \\in M\\) and let \\(q\\) be a point of maximal distance from \\(p\\). The \\(1/4\\)-pinching ensures \\(d(p,q) \\geq \\pi/2\\) (using Rauch/Klingenberg's injectivity radius estimate).</li>
    <li><strong>Show every point is "close to a pole":</strong> For any \\(x \\in M\\), either \\(d(x,p) \\leq \\pi/2\\) or \\(d(x,q) \\leq \\pi/2\\). This uses Toponogov triangle comparison.</li>
    <li><strong>Construct hemispheres:</strong> The sets \\(U = \\{x : d(x,p) < \\pi/2 + \\epsilon\\}\\) and \\(V = \\{x : d(x,q) < \\pi/2 + \\epsilon\\}\\) cover \\(M\\), and each is diffeomorphic to a disk (via the exponential map).</li>
    <li><strong>Glue:</strong> \\(M = U \\cup V\\) with \\(U \\cap V\\) an annulus. This is a sphere.</li>
</ol>

<div class="env-block remark">
    <div class="env-title">The Differentiable Sphere Theorem</div>
    <div class="env-body">
        <p>The classical theorem only gives a homeomorphism, not a diffeomorphism. In 2007, Brendle and Schoen proved the <strong>differentiable sphere theorem</strong>: a \\(1/4\\)-pinched manifold is <em>diffeomorphic</em> to \\(S^n\\). Their proof uses Ricci flow, which we discuss in the next section. This resolved a conjecture that had been open for nearly 50 years.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-sphere-theorem"></div>
`,
            visualizations: [
                {
                    id: 'viz-sphere-theorem',
                    title: 'The Sphere Theorem: Pinching Rounds a Manifold',
                    description: 'A conceptual illustration of the sphere theorem. As the pinching ratio increases toward 1, the manifold becomes more and more "round." Below 1/4, exotic topologies are possible.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 280, originY: 180, scale: 1
                        });

                        var delta = 0.5;
                        VizEngine.createSlider(controls, '\u03b4 (pinching)', 0.05, 1.0, delta, 0.05, function(v) {
                            delta = v; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('1/4-Pinched Sphere Theorem', viz.width / 2, 18, viz.colors.white, 14);

                            // Draw a shape that interpolates from bumpy to round based on delta
                            var cx = 220, cy = 190, baseR = 80;
                            var nPts = 200;

                            // Generate a deformed ellipse
                            ctx.beginPath();
                            for (var i = 0; i <= nPts; i++) {
                                var theta = 2 * Math.PI * i / nPts;
                                // Perturbation decreases as delta -> 1
                                var perturbation = (1 - delta) * 0.4;
                                var r = baseR * (1 + perturbation * Math.sin(3 * theta) * 0.8
                                    + perturbation * Math.cos(5 * theta) * 0.5
                                    + perturbation * Math.sin(7 * theta) * 0.3);
                                var px = cx + r * Math.cos(theta);
                                var py = cy + r * Math.sin(theta);
                                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                            }
                            ctx.closePath();

                            // Color based on pinching
                            var isAboveQuarter = delta > 0.25;
                            var fillColor = isAboveQuarter ? viz.colors.blue + '33' : viz.colors.red + '33';
                            var strokeColor = isAboveQuarter ? viz.colors.blue : viz.colors.red;
                            ctx.fillStyle = fillColor; ctx.fill();
                            ctx.strokeStyle = strokeColor; ctx.lineWidth = 2; ctx.stroke();

                            // Reference circle (perfect sphere)
                            ctx.strokeStyle = viz.colors.white + '44'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.arc(cx, cy, baseR, 0, Math.PI * 2); ctx.stroke();
                            ctx.setLineDash([]);

                            // Status panel on the right
                            var rx = 400;
                            viz.screenText('\u03b4 = ' + delta.toFixed(2), rx, 80, viz.colors.white, 16);
                            viz.screenText('\u03b4\u03ba \u2264 K \u2264 \u03ba', rx, 110, viz.colors.text, 12);

                            // Critical threshold marker
                            viz.screenText('Critical: \u03b4 = 1/4 = 0.25', rx, 160, viz.colors.yellow, 11);

                            if (delta > 0.25) {
                                viz.screenText('Above 1/4-pinch:', rx, 200, viz.colors.blue, 12);
                                viz.screenText('Homeomorphic to S\u207F', rx, 220, viz.colors.blue, 12);
                            } else {
                                viz.screenText('Below 1/4-pinch:', rx, 200, viz.colors.red, 12);
                                viz.screenText('May not be a sphere', rx, 220, viz.colors.red, 12);
                                viz.screenText('(e.g. CP\u207F at \u03b4=1/4)', rx, 240, viz.colors.text, 10);
                            }

                            // Pinching bar at bottom
                            var barY = 320, barX = 60, barW = 440;
                            ctx.fillStyle = viz.colors.grid;
                            ctx.fillRect(barX, barY, barW, 8);

                            // 1/4 marker
                            var qX = barX + 0.25 * barW;
                            ctx.strokeStyle = viz.colors.yellow; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(qX, barY - 5); ctx.lineTo(qX, barY + 13); ctx.stroke();
                            viz.screenText('1/4', qX, barY + 22, viz.colors.yellow, 10);

                            // Current delta
                            var dX = barX + delta * barW;
                            ctx.fillStyle = isAboveQuarter ? viz.colors.blue : viz.colors.red;
                            ctx.beginPath(); ctx.arc(dX, barY + 4, 6, 0, Math.PI * 2); ctx.fill();

                            viz.screenText('0', barX - 8, barY + 4, viz.colors.text, 10);
                            viz.screenText('1', barX + barW + 8, barY + 4, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(\\mathbb{CP}^2\\) with the Fubini-Study metric has sectional curvatures in \\([1/4, 1]\\), and explain why this does not contradict the sphere theorem.',
                    hint: 'The sphere theorem requires <em>strict</em> inequality \\(\\delta > 1/4\\). Check: is \\(\\mathbb{CP}^2\\) simply connected?',
                    solution: 'The Fubini-Study metric on \\(\\mathbb{CP}^2\\) has sectional curvatures \\(K \\in [1/4, 1]\\), with \\(K = 1\\) on complex lines and \\(K = 1/4\\) on totally real planes. The sphere theorem requires \\(\\delta > 1/4\\) (strict inequality). Since \\(\\mathbb{CP}^2\\) achieves \\(K = 1/4\\), the hypothesis is not satisfied. Indeed, \\(\\mathbb{CP}^2\\) is simply connected but not homeomorphic to \\(S^4\\) (it has \\(H_2(\\mathbb{CP}^2) = \\mathbb{Z} \\neq 0\\)).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Ricci Flow
        // ================================================================
        {
            id: 'sec-ricci-flow',
            title: 'Ricci Flow',
            content: `
<h2>Ricci Flow</h2>

<div class="env-block intuition">
    <div class="env-title">Geometry as a Dynamical System</div>
    <div class="env-body">
        <p>What if, instead of studying a fixed metric, we let the metric <strong>evolve</strong>? Richard Hamilton's stroke of genius (1982) was to propose that a Riemannian metric should evolve by its own Ricci curvature, analogous to the heat equation smoothing temperature. Regions of high curvature should shrink; regions of low curvature should expand. Over time, the geometry simplifies, and topology becomes visible.</p>
    </div>
</div>

<h3>The Ricci Flow Equation</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Ricci Flow)</div>
    <div class="env-body">
        <p>Given a Riemannian manifold \\((M, g_0)\\), the <strong>Ricci flow</strong> is the PDE</p>
        \\[\\frac{\\partial g}{\\partial t} = -2 \\operatorname{Ric}(g),\\]
        <p>with initial condition \\(g(0) = g_0\\).</p>
    </div>
</div>

<p>Why \\(-2\\operatorname{Ric}\\)? The Ricci tensor \\(\\operatorname{Ric}\\) is a symmetric 2-tensor (like the metric itself), so the equation makes sense. The sign is chosen so that positive Ricci curvature causes the metric to <em>shrink</em> (the manifold contracts in directions of positive curvature). The factor of 2 is a normalization convention.</p>

<h3>Ricci Flow as a Heat Equation</h3>

<p>In harmonic coordinates, the Ricci flow takes the form</p>

\\[
\\frac{\\partial g_{ij}}{\\partial t} = \\Delta g_{ij} + \\text{lower order terms},
\\]

<p>where \\(\\Delta\\) is the Laplacian. This is a (weakly) parabolic system, so it behaves like the heat equation: it smooths out irregularities in the metric. Just as the heat equation homogenizes temperature, Ricci flow homogenizes curvature.</p>

<h3>Hamilton's Program</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 19.9 (Hamilton 1982)</div>
    <div class="env-body">
        <p>If \\((M^3, g_0)\\) is a closed 3-manifold with positive Ricci curvature, then the (normalized) Ricci flow converges to a metric of constant positive sectional curvature. Hence \\(M\\) is diffeomorphic to a spherical space form \\(S^3/\\Gamma\\).</p>
    </div>
</div>

<p>Hamilton's result was the first major application of Ricci flow. His grand program was to use Ricci flow to prove the <strong>Geometrization Conjecture</strong> (Thurston, 1982): every closed 3-manifold can be decomposed into pieces, each carrying one of eight model geometries. The Poincare conjecture is a special case.</p>

<h3>Singularities and Surgery</h3>

<p>The main obstacle is that Ricci flow can develop <strong>singularities</strong> in finite time. The curvature can blow up, and the manifold "pinches off." Hamilton proposed a surgery procedure: cut the manifold at the singularity, cap off the pieces with spherical caps, and restart the flow. The challenge is to control the topology through surgery.</p>

<h3>Perelman's Breakthrough</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 19.10 (Perelman, 2002-2003)</div>
    <div class="env-body">
        <p>Hamilton's Ricci flow with surgery, together with Perelman's monotonicity formulas and non-collapsing estimates, proves:</p>
        <ol>
            <li><strong>Geometrization Conjecture:</strong> Every closed orientable 3-manifold admits a geometric decomposition.</li>
            <li><strong>Poincare Conjecture:</strong> Every simply connected closed 3-manifold is homeomorphic to \\(S^3\\).</li>
        </ol>
    </div>
</div>

<p>Perelman's key innovations were:</p>

<ul>
    <li>The <strong>\\(\\mathcal{W}\\)-entropy</strong> and <strong>\\(\\mu\\)-functional</strong>: monotone quantities under Ricci flow, analogous to entropy in statistical mechanics.</li>
    <li>The <strong>non-collapsing theorem</strong>: prevents the geometry from degenerating at singularities.</li>
    <li>The <strong>canonical neighborhood theorem</strong>: near any singularity, the geometry looks like a standard model (a neck \\(S^2 \\times \\mathbb{R}\\), a cap, or a quotient), so surgery can be performed in a controlled way.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Perelman posted his proofs on arXiv in 2002-2003 and never submitted them for publication. He was awarded the Fields Medal in 2006 and the Clay Millennium Prize in 2010, both of which he declined. The Poincare conjecture was the first (and so far only) Clay Millennium Problem to be solved.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-ricci-flow-conceptual"></div>
`,
            visualizations: [
                {
                    id: 'viz-ricci-flow-conceptual',
                    title: 'Ricci Flow: Curvature Evolution',
                    description: 'A conceptual illustration of Ricci flow smoothing out curvature. Watch as a bumpy surface becomes progressively rounder under the flow. Regions of high curvature shrink faster.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 280, originY: 200, scale: 1
                        });

                        var time = 0;
                        var playing = false;
                        var animId = null;

                        VizEngine.createSlider(controls, 'Time t', 0, 5, 0, 0.05, function(v) {
                            time = v; drawFrame();
                        });

                        var playBtn = VizEngine.createButton(controls, 'Play', function() {
                            if (playing) {
                                playing = false;
                                playBtn.textContent = 'Play';
                                if (animId) cancelAnimationFrame(animId);
                            } else {
                                playing = true;
                                playBtn.textContent = 'Pause';
                                time = 0;
                                animate();
                            }
                        });

                        function animate() {
                            if (!playing) return;
                            time += 0.02;
                            if (time > 5) { time = 0; }
                            drawFrame();
                            animId = requestAnimationFrame(animate);
                        }

                        function drawFrame() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Ricci Flow: \u2202g/\u2202t = -2 Ric(g)', viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('t = ' + time.toFixed(2), viz.width / 2, 40, viz.colors.teal, 12);

                            // Draw a cross-section curve that smooths out over time
                            var cx = 280, cy = 200;
                            var decay = Math.exp(-0.5 * time);
                            var baseR = 100;

                            // Bumpy profile
                            ctx.beginPath();
                            var nPts = 300;
                            for (var i = 0; i <= nPts; i++) {
                                var theta = 2 * Math.PI * i / nPts;
                                var bump = decay * (
                                    0.25 * Math.sin(3 * theta) +
                                    0.15 * Math.cos(5 * theta) +
                                    0.1 * Math.sin(7 * theta) +
                                    0.08 * Math.cos(11 * theta)
                                );
                                var r = baseR * (1 + bump);
                                var px = cx + r * Math.cos(theta);
                                var py = cy + r * Math.sin(theta);
                                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                            }
                            ctx.closePath();

                            // Gradient fill based on local curvature
                            var grad = ctx.createRadialGradient(cx, cy, baseR * 0.3, cx, cy, baseR * 1.3);
                            grad.addColorStop(0, viz.colors.blue + '44');
                            grad.addColorStop(1, viz.colors.purple + '22');
                            ctx.fillStyle = grad; ctx.fill();
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2; ctx.stroke();

                            // Reference circle
                            ctx.strokeStyle = viz.colors.white + '33'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.arc(cx, cy, baseR, 0, Math.PI * 2); ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw curvature indicators (arrows pointing inward at bumps)
                            if (time < 4) {
                                for (var k = 0; k < 8; k++) {
                                    var th = k * Math.PI / 4;
                                    var bump2 = decay * (
                                        0.25 * Math.sin(3 * th) +
                                        0.15 * Math.cos(5 * th) +
                                        0.1 * Math.sin(7 * th)
                                    );
                                    if (Math.abs(bump2) > 0.02) {
                                        var r2 = baseR * (1 + bump2);
                                        var px2 = cx + r2 * Math.cos(th);
                                        var py2 = cy + r2 * Math.sin(th);
                                        var arrowLen = bump2 * baseR * 0.8;
                                        var ax = px2 - arrowLen * Math.cos(th);
                                        var ay = py2 - arrowLen * Math.sin(th);

                                        ctx.strokeStyle = bump2 > 0 ? viz.colors.red + '88' : viz.colors.green + '88';
                                        ctx.lineWidth = 1.5;
                                        ctx.beginPath(); ctx.moveTo(px2, py2); ctx.lineTo(ax, ay); ctx.stroke();

                                        // Arrowhead
                                        var angle = Math.atan2(ay - py2, ax - px2);
                                        ctx.fillStyle = bump2 > 0 ? viz.colors.red + '88' : viz.colors.green + '88';
                                        ctx.beginPath();
                                        ctx.moveTo(ax, ay);
                                        ctx.lineTo(ax - 6 * Math.cos(angle - 0.4), ay - 6 * Math.sin(angle - 0.4));
                                        ctx.lineTo(ax - 6 * Math.cos(angle + 0.4), ay - 6 * Math.sin(angle + 0.4));
                                        ctx.closePath(); ctx.fill();
                                    }
                                }
                            }

                            // Annotations
                            viz.screenText('High curvature \u2192 shrinks', 100, 340, viz.colors.red, 10);
                            viz.screenText('Low curvature \u2192 expands', 430, 340, viz.colors.green, 10);

                            var roundness = (1 - decay) * 100;
                            viz.screenText('Roundness: ' + roundness.toFixed(0) + '%', viz.width / 2, 345, viz.colors.teal, 11);
                        }
                        drawFrame();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that under the Ricci flow, the scalar curvature \\(R\\) satisfies \\(\\frac{\\partial R}{\\partial t} = \\Delta R + 2|\\operatorname{Ric}|^2\\). Why does this imply that \\(R_{\\min}(t)\\) is non-decreasing?',
                    hint: 'Apply the maximum principle to the evolution equation for \\(R\\).',
                    solution: 'The evolution equation \\(\\partial_t R = \\Delta R + 2|\\operatorname{Ric}|^2\\) is derived by computing the variation of scalar curvature under \\(\\partial_t g = -2\\operatorname{Ric}\\). At a point where \\(R\\) achieves its minimum, \\(\\Delta R \\geq 0\\) (subharmonic at minima), and \\(2|\\operatorname{Ric}|^2 \\geq 0\\). By the maximum principle, \\(\\partial_t R_{\\min} \\geq 0\\), so the minimum scalar curvature is non-decreasing. This means Ricci flow can only increase the minimal curvature; it never makes low-curvature regions worse.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: The Unity of Geometry (Coda)
        // ================================================================
        {
            id: 'sec-coda',
            title: 'The Unity of Geometry',
            content: `
<h2>The Unity of Geometry</h2>

<div class="env-block intuition">
    <div class="env-title">A Course in Perspective</div>
    <div class="env-body">
        <p>We began with curves in \\(\\mathbb{R}^n\\) and the Frenet frame. We moved to surfaces and the Gauss map. We abstracted to smooth manifolds, then equipped them with Riemannian metrics. We built connections, defined geodesics, computed curvature tensors. Along the way, we discovered that curvature, a concept born from the study of plane curves, is the master key that unlocks the deepest truths about shape, space, and topology.</p>
    </div>
</div>

<h3>The Hierarchy We Built</h3>

<p>Looking back, the course followed a clear progression from concrete to abstract, from local to global:</p>

<div class="env-block definition">
    <div class="env-title">The Conceptual Ladder</div>
    <div class="env-body">
        <ol>
            <li><strong>Curves</strong> (Chapters 0-2): Curvature and torsion as scalar invariants. The Frenet-Serret equations as an ODE system. The fundamental theorem of curves: curvature and torsion determine the curve up to rigid motion.</li>
            <li><strong>Surfaces</strong> (Chapters 3-7): Two curvatures (Gaussian and mean) instead of one. The first and second fundamental forms. Geodesics as "straightest" paths. The Gauss map encodes how the surface curves in space.</li>
            <li><strong>Intrinsic geometry</strong> (Chapters 8-10): Gauss's Theorema Egregium reveals that Gaussian curvature is intrinsic. The Gauss-Bonnet theorem connects curvature to topology. Minimal surfaces as critical points of area.</li>
            <li><strong>Manifolds</strong> (Chapters 11-13): The leap to abstract spaces. Charts, atlases, tangent spaces. Differential forms and Stokes' theorem as the language of calculus on manifolds.</li>
            <li><strong>Riemannian geometry</strong> (Chapters 14-17): Metrics, connections, curvature tensors. The Levi-Civita connection as the unique torsion-free metric connection. Sectional, Ricci, and scalar curvature.</li>
            <li><strong>Global results</strong> (Chapters 18-19): Jacobi fields, conjugate points, comparison theorems. The sphere theorem and Ricci flow: curvature determines topology.</li>
        </ol>
    </div>
</div>

<h3>Connections to Other Fields</h3>

<p>Differential geometry is not an isolated subject. It sits at the crossroads of mathematics, physics, and computer science.</p>

<h4>General Relativity</h4>

<p>Einstein's field equations \\(G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}\\) are a statement about Ricci curvature: the Einstein tensor \\(G = \\operatorname{Ric} - \\frac{1}{2}Rg\\) equates geometry (left side) to matter-energy (right side). Spacetime is a pseudo-Riemannian 4-manifold. Geodesics are the paths of freely falling particles. The comparison theorems of this chapter have analogues (Hawking-Penrose singularity theorems) that predict black holes and the Big Bang.</p>

<h4>Topology</h4>

<p>The Gauss-Bonnet theorem, the sphere theorem, and Perelman's geometrization theorem all connect curvature to topology. The Atiyah-Singer index theorem generalizes Gauss-Bonnet to higher-dimensional manifolds, relating the index of an elliptic operator to topological invariants.</p>

<h4>PDE and Analysis</h4>

<p>Ricci flow is a nonlinear parabolic PDE. Minimal surfaces satisfy an elliptic PDE. The Laplacian on a Riemannian manifold encodes geometric information through its spectrum (spectral geometry: "Can you hear the shape of a drum?"). Comparison theorems are proved using ODE comparison principles.</p>

<h4>Gauge Theory and String Theory</h4>

<p>Connections on fiber bundles (generalized Levi-Civita connections) are the mathematical language of gauge fields in physics. Yang-Mills theory, the foundation of the Standard Model of particle physics, is a generalization of electromagnetism formulated using connections. String theory posits that the fundamental objects are not points but 1-dimensional curves (strings) moving through a 10-dimensional Riemannian manifold whose geometry is constrained by Ricci-flatness (Calabi-Yau manifolds).</p>

<div class="viz-placeholder" data-viz="viz-connections-web"></div>

<h3>Open Problems</h3>

<p>Differential geometry remains an active field with many open problems:</p>

<ul>
    <li><strong>Smooth Poincare conjecture in dimension 4:</strong> Is every smooth manifold homeomorphic to \\(S^4\\) also diffeomorphic to \\(S^4\\)? (Open! Dimension 4 is uniquely difficult.)</li>
    <li><strong>Yau's conjecture on minimal surfaces:</strong> Does every closed Riemannian 3-manifold contain infinitely many minimal surfaces? (Proved by Marques-Neves using min-max theory, Song for generic metrics.)</li>
    <li><strong>Positive curvature manifolds:</strong> Classify all simply connected compact manifolds admitting metrics of positive sectional curvature. Very few examples are known beyond the rank-one symmetric spaces.</li>
    <li><strong>Ricci flow in dimension 4:</strong> Extend Perelman's geometrization program to 4-manifolds. This is a major open frontier.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">A Final Thought</div>
    <div class="env-body">
        <p>Riemann, in his 1854 Habilitationsvortrag, proposed that the geometry of space should not be assumed a priori but discovered empirically. He envisioned a framework where curvature could vary from point to point, and where the global structure of space would emerge from local geometric data. Everything in this course, from Frenet frames to Perelman's proof, is the working out of Riemann's vision. The interplay between curvature (local, analytic) and topology (global, combinatorial) remains one of the most profound themes in all of mathematics.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-connections-web',
                    title: 'The Web of Differential Geometry',
                    description: 'An interactive map showing how differential geometry connects to general relativity, topology, PDE, string theory, and other fields. Click nodes to highlight connections.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 1
                        });

                        var nodes = [
                            { id: 'dg', label: 'Differential\nGeometry', x: 280, y: 200, color: '#58a6ff', r: 32 },
                            { id: 'gr', label: 'General\nRelativity', x: 100, y: 80, color: '#f0883e', r: 24 },
                            { id: 'top', label: 'Topology', x: 460, y: 80, color: '#3fb950', r: 24 },
                            { id: 'pde', label: 'PDE &\nAnalysis', x: 460, y: 320, color: '#bc8cff', r: 24 },
                            { id: 'str', label: 'String\nTheory', x: 100, y: 320, color: '#f85149', r: 24 },
                            { id: 'alg', label: 'Algebraic\nGeometry', x: 480, y: 200, color: '#d29922', r: 20 },
                            { id: 'cs', label: 'Computer\nGraphics', x: 80, y: 200, color: '#3fb9a0', r: 20 },
                            { id: 'gauge', label: 'Gauge\nTheory', x: 190, y: 120, color: '#f778ba', r: 18 },
                            { id: 'spec', label: 'Spectral\nGeometry', x: 380, y: 300, color: '#58a6ff', r: 18 }
                        ];

                        var edges = [
                            { from: 'dg', to: 'gr', label: 'Einstein eqns' },
                            { from: 'dg', to: 'top', label: 'Gauss-Bonnet,\nSphere thm' },
                            { from: 'dg', to: 'pde', label: 'Ricci flow,\nminimal sfc' },
                            { from: 'dg', to: 'str', label: 'Calabi-Yau' },
                            { from: 'dg', to: 'alg', label: 'Hodge theory' },
                            { from: 'dg', to: 'cs', label: 'Mesh, curves' },
                            { from: 'dg', to: 'gauge', label: 'Connections' },
                            { from: 'dg', to: 'spec', label: 'Laplacian' },
                            { from: 'gr', to: 'gauge', label: '' },
                            { from: 'gauge', to: 'str', label: '' },
                            { from: 'top', to: 'pde', label: 'Index thm' },
                            { from: 'spec', to: 'pde', label: '' },
                            { from: 'alg', to: 'top', label: '' }
                        ];

                        var hovered = null;

                        function getNode(id) {
                            for (var i = 0; i < nodes.length; i++) {
                                if (nodes[i].id === id) return nodes[i];
                            }
                            return null;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw edges
                            for (var ei = 0; ei < edges.length; ei++) {
                                var e = edges[ei];
                                var nf = getNode(e.from);
                                var nt = getNode(e.to);
                                if (!nf || !nt) continue;

                                var isHighlighted = hovered && (hovered === e.from || hovered === e.to);
                                ctx.strokeStyle = isHighlighted ? '#ffffff88' : '#ffffff22';
                                ctx.lineWidth = isHighlighted ? 2 : 1;
                                ctx.beginPath();
                                ctx.moveTo(nf.x, nf.y);
                                ctx.lineTo(nt.x, nt.y);
                                ctx.stroke();

                                // Edge label
                                if (e.label) {
                                    var mx = (nf.x + nt.x) / 2;
                                    var my = (nf.y + nt.y) / 2;
                                    var lines = e.label.split('\n');
                                    ctx.fillStyle = isHighlighted ? '#ffffffaa' : '#ffffff44';
                                    ctx.font = '9px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    for (var li = 0; li < lines.length; li++) {
                                        ctx.fillText(lines[li], mx, my + (li - (lines.length - 1) / 2) * 11);
                                    }
                                }
                            }

                            // Draw nodes
                            for (var ni = 0; ni < nodes.length; ni++) {
                                var n = nodes[ni];
                                var isHov = hovered === n.id;

                                // Glow
                                if (isHov) {
                                    ctx.fillStyle = n.color + '33';
                                    ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 8, 0, Math.PI * 2); ctx.fill();
                                }

                                // Circle
                                ctx.fillStyle = isHov ? n.color + 'cc' : n.color + '66';
                                ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
                                ctx.strokeStyle = n.color; ctx.lineWidth = isHov ? 2.5 : 1.5;
                                ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.stroke();

                                // Label
                                var lines2 = n.label.split('\n');
                                ctx.fillStyle = '#f0f6fc';
                                ctx.font = (n.r > 25 ? 11 : 9) + 'px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                for (var li2 = 0; li2 < lines2.length; li2++) {
                                    ctx.fillText(lines2[li2], n.x, n.y + (li2 - (lines2.length - 1) / 2) * 12);
                                }
                            }
                        }

                        // Mouse hover
                        viz.canvas.addEventListener('mousemove', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            var oldHov = hovered;
                            hovered = null;
                            for (var ni = 0; ni < nodes.length; ni++) {
                                var n = nodes[ni];
                                var dx = mx - n.x, dy = my - n.y;
                                if (dx * dx + dy * dy < (n.r + 5) * (n.r + 5)) {
                                    hovered = n.id;
                                    break;
                                }
                            }
                            if (hovered !== oldHov) draw();
                        });

                        viz.canvas.addEventListener('mouseleave', function() {
                            hovered = null; draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Trace the concept of "curvature" through the course. For each level (curves, surfaces, manifolds), state what curvature measures, how many independent components it has, and give one global theorem it controls.',
                    hint: 'Consider: curvature of a plane curve (1 number), Gaussian and mean curvature of a surface (2 numbers), the full Riemann curvature tensor of an \\(n\\)-manifold (\\(n^2(n^2-1)/12\\) independent components).',
                    solution: '<strong>Curves:</strong> Curvature \\(\\kappa(s)\\) measures the rate of turning of the tangent vector. One component. Global result: total curvature of a closed plane curve equals \\(2\\pi k\\) (turning number). <br><strong>Surfaces:</strong> Gaussian curvature \\(K\\) and mean curvature \\(H\\). Two independent components of the shape operator. Global result: Gauss-Bonnet \\(\\int_M K \\, dA = 2\\pi\\chi(M)\\). <br><strong>Riemannian manifolds:</strong> The Riemann curvature tensor \\(R_{ijkl}\\) with \\(n^2(n^2-1)/12\\) independent components (e.g., 1 in dimension 2, 6 in dimension 3, 20 in dimension 4). Sectional curvature, Ricci curvature, scalar curvature are successive traces. Global results: Bonnet-Myers (Ricci > 0 implies compact), sphere theorem (1/4-pinched implies sphere), Perelman (Ricci flow proves Poincare conjecture).'
                },
                {
                    question: '(Essay) The Theorema Egregium says Gaussian curvature is intrinsic. The comparison theorems say intrinsic curvature controls topology. Discuss how these two ideas together justify calling curvature the "DNA of geometry." What information is lost when we pass from the full Riemann tensor to Ricci curvature? Give examples where Ricci curvature suffices and where it does not.',
                    hint: 'Think about what "intrinsic" means for applications (you do not need an embedding). For the Ricci vs. sectional distinction, consider: Bishop-Gromov uses Ricci, but the sphere theorem needs sectional curvature.',
                    solution: 'The Theorema Egregium (Chapter 8) showed that Gaussian curvature depends only on the metric, not on how the surface sits in space. This means curvature is an intrinsic property: a creature living on the surface can measure it without reference to any ambient space. The comparison theorems (Chapter 19) show that this intrinsic quantity controls global shape: bounded curvature implies bounded diameter (Bonnet-Myers), specific topology (sphere theorem), and volume growth (Bishop-Gromov). Together, these say that the curvature, computable from local measurements, encodes the global identity of the space. <br><br>Passing from the Riemann tensor to Ricci curvature loses information about "directional" curvature variation. Ricci curvature is a trace over sectional curvatures, so it captures average behavior but not the extremes. <em>When Ricci suffices:</em> Bonnet-Myers (compactness from Ric > 0), Bishop-Gromov volume comparison, and the Cheeger-Gromoll splitting theorem all use only Ricci bounds. <em>When it does not:</em> The sphere theorem requires pointwise sectional curvature pinching. A manifold can have Ric > 0 without being homeomorphic to a sphere (e.g., \\(\\mathbb{CP}^n\\)). The Weyl tensor (the trace-free part of Riemann) carries conformal information invisible to Ricci curvature.'
                }
            ]
        }
    ]
});
