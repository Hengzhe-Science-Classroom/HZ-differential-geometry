window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch16',
    number: 16,
    title: 'Geodesics & the Exponential Map',
    subtitle: 'Straight lines in curved space',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Geodesics?</h2>

<div class="env-block intuition">
    <div class="env-title">The Central Question</div>
    <div class="env-body">
        <p>In Euclidean space, the shortest path between two points is a straight line. On a curved surface, what replaces a straight line? An ant walking on a sphere cannot walk in a Euclidean straight line; it walks along a <em>great circle</em>. Geodesics are the generalization of straight lines to curved spaces.</p>
    </div>
</div>

<p>There are two equivalent ways to characterize "straight" on a Riemannian manifold \\((M, g)\\):</p>
<ol>
    <li><strong>Zero acceleration:</strong> A curve \\(\\gamma\\) whose velocity field is parallel along itself, i.e., \\(\\nabla_{\\gamma'} \\gamma' = 0\\). The curve "does not turn" relative to the intrinsic geometry.</li>
    <li><strong>Locally length-minimizing:</strong> Among all nearby curves connecting the same endpoints, \\(\\gamma\\) has the shortest length (at least locally).</li>
</ol>

<p>These two characterizations agree locally but diverge globally. A great circle on \\(S^2\\) always satisfies \\(\\nabla_{\\gamma'} \\gamma' = 0\\), but it stops being the shortest path once it passes the antipodal point.</p>

<h3>What This Chapter Covers</h3>

<p>We develop geodesics as solutions to a second-order ODE, introduce the exponential map \\(\\exp_p : T_pM \\to M\\) that "shoots" geodesics from a point, construct normal coordinates that make the geometry look Euclidean near \\(p\\), and prove the foundational completeness and minimization results.</p>

<div class="env-block remark">
    <div class="env-title">Prerequisites</div>
    <div class="env-body">
        <p>This chapter requires the Levi-Civita connection \\(\\nabla\\) from Chapter 15. We use the Christoffel symbols \\(\\Gamma^k_{ij}\\) and the notion of parallel transport extensively. The Riemannian metric \\(g\\) from Chapter 14 underpins the length functional.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: The Geodesic Equation
        // ================================================================
        {
            id: 'sec-geodesic-equation',
            title: 'The Geodesic Equation',
            content: `
<h2>The Geodesic Equation</h2>

<div class="env-block definition">
    <div class="env-title">Definition (Geodesic)</div>
    <div class="env-body">
        <p>A smooth curve \\(\\gamma : I \\to M\\) on a Riemannian manifold \\((M, g)\\) is a <strong>geodesic</strong> if its velocity field is parallel along itself:</p>
        \\[\\nabla_{\\gamma'(t)} \\gamma'(t) = 0 \\quad \\text{for all } t \\in I.\\]
        <p>Equivalently, \\(\\gamma\\) has zero <em>geodesic curvature</em>: it "goes straight" according to the connection.</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">What "Parallel Along Itself" Means</div>
    <div class="env-body">
        <p>Imagine driving a car on a curved surface. At each instant, your steering wheel is centered (no turning). The condition \\(\\nabla_{\\gamma'} \\gamma' = 0\\) says the velocity vector is being parallel-transported along the curve, so the "direction" never changes relative to the geometry. The car goes as straight as the surface allows.</p>
    </div>
</div>

<h3>In Local Coordinates</h3>

<p>Let \\((x^1, \\ldots, x^n)\\) be local coordinates. Write \\(\\gamma(t) = (\\gamma^1(t), \\ldots, \\gamma^n(t))\\). Using the formula for covariant differentiation along a curve:</p>

\\[\\nabla_{\\gamma'} \\gamma' = \\left( \\ddot{\\gamma}^k + \\Gamma^k_{ij} \\dot{\\gamma}^i \\dot{\\gamma}^j \\right) \\partial_k\\]

<p>where \\(\\dot{\\gamma}^i = d\\gamma^i/dt\\). Setting this to zero gives the <strong>geodesic equation</strong>:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.1 (Geodesic Equation)</div>
    <div class="env-body">
        <p>A curve \\(\\gamma\\) is a geodesic if and only if in local coordinates:</p>
        \\[\\ddot{\\gamma}^k(t) + \\Gamma^k_{ij}(\\gamma(t))\\, \\dot{\\gamma}^i(t)\\, \\dot{\\gamma}^j(t) = 0, \\quad k = 1, \\ldots, n.\\]
        <p>This is a system of \\(n\\) second-order ODEs.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Geodesics in \\(\\mathbb{R}^n\\)</div>
    <div class="env-body">
        <p>In Euclidean space with Cartesian coordinates, all Christoffel symbols vanish: \\(\\Gamma^k_{ij} = 0\\). The geodesic equation becomes \\(\\ddot{\\gamma}^k = 0\\), so \\(\\gamma(t) = p + tv\\) for constant vectors \\(p, v\\). Geodesics are straight lines, as expected.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Geodesics on \\(S^2\\)</div>
    <div class="env-body">
        <p>On the 2-sphere of radius \\(R\\), geodesics are great circles: intersections of the sphere with planes through the origin. Using spherical coordinates \\((\\theta, \\phi)\\), the geodesic equations are:</p>
        \\[\\ddot{\\theta} - \\sin\\theta\\cos\\theta\\, \\dot{\\phi}^2 = 0, \\qquad \\ddot{\\phi} + 2\\cot\\theta\\, \\dot{\\theta}\\dot{\\phi} = 0.\\]
        <p>The equator \\(\\theta = \\pi/2, \\phi = t\\) satisfies both equations. Any great circle can be rotated to the equator.</p>
    </div>
</div>

<h3>Existence and Uniqueness</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.2 (Local Existence and Uniqueness)</div>
    <div class="env-body">
        <p>For any point \\(p \\in M\\) and any tangent vector \\(v \\in T_pM\\), there exists a unique maximal geodesic \\(\\gamma_v : I \\to M\\) (where \\(I\\) is an open interval containing \\(0\\)) satisfying:</p>
        \\[\\gamma_v(0) = p, \\quad \\gamma_v'(0) = v.\\]
        <p>Moreover, \\(\\gamma_v\\) depends smoothly on \\((p, v)\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Rewrite the second-order system as a first-order system on the tangent bundle \\(TM\\). Setting \\(u^k = \\dot{\\gamma}^k\\), the geodesic equation becomes:</p>
        \\[\\dot{\\gamma}^k = u^k, \\qquad \\dot{u}^k = -\\Gamma^k_{ij}(\\gamma)\\, u^i u^j.\\]
        <p>This is a smooth ODE on \\(TM\\). By the Picard-Lindel&ouml;f theorem, it has a unique solution for any initial condition \\((\\gamma(0), u(0)) = (p, v)\\), defined on some maximal interval.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Constant Speed</h3>

<div class="env-block theorem">
    <div class="env-title">Proposition 16.3 (Geodesics Have Constant Speed)</div>
    <div class="env-body">
        <p>If \\(\\gamma\\) is a geodesic, then \\(|\\gamma'(t)|_g = \\text{const}\\). In particular, geodesics are automatically parametrized proportionally to arc length.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Compute:</p>
        \\[\\frac{d}{dt} g(\\gamma', \\gamma') = 2\\, g(\\nabla_{\\gamma'} \\gamma', \\gamma') = 2\\, g(0, \\gamma') = 0.\\]
        <p>The first equality uses metric compatibility of \\(\\nabla\\), and the second uses \\(\\nabla_{\\gamma'}\\gamma' = 0\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="viz-placeholder" data-viz="viz-geodesic-sphere"></div>
`,
            visualizations: [
                {
                    id: 'viz-geodesic-sphere',
                    title: 'Geodesic Circles on the Sphere',
                    description: 'Geodesics radiate from a point on the sphere. The circles of equal geodesic distance start Euclidean-looking but distort as they approach the antipodal point. Drag the radius slider to see geodesic circles grow.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 120
                        });

                        var radius = 0.5;
                        var time = 0;
                        var numGeodesics = 24;

                        VizEngine.createSlider(controls, 'Radius', 0.1, 3.1, radius, 0.05, function(v) {
                            radius = v;
                        });

                        // Project 3D point to 2D (oblique projection)
                        function project(x, y, z) {
                            var px = x * 0.9 + z * 0.35;
                            var py = -y * 0.9 - z * 0.15;
                            return [px, py];
                        }

                        // Spherical to Cartesian
                        function sph(theta, phi) {
                            return [
                                Math.sin(theta) * Math.cos(phi),
                                Math.sin(theta) * Math.sin(phi),
                                Math.cos(theta)
                            ];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw sphere wireframe
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            // Latitude lines
                            for (var lat = 1; lat < 6; lat++) {
                                var th = lat * Math.PI / 6;
                                ctx.beginPath();
                                for (var i = 0; i <= 60; i++) {
                                    var ph = i * 2 * Math.PI / 60;
                                    var pt = sph(th, ph);
                                    var sp = project(pt[0], pt[1], pt[2]);
                                    var sx = viz.originX + sp[0] * viz.scale;
                                    var sy = viz.originY + sp[1] * viz.scale;
                                    if (i === 0) ctx.moveTo(sx, sy);
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }
                            // Longitude lines
                            for (var lon = 0; lon < 12; lon++) {
                                var ph2 = lon * Math.PI / 6;
                                ctx.beginPath();
                                for (var j = 0; j <= 30; j++) {
                                    var th2 = j * Math.PI / 30;
                                    var pt2 = sph(th2, ph2);
                                    var sp2 = project(pt2[0], pt2[1], pt2[2]);
                                    var sx2 = viz.originX + sp2[0] * viz.scale;
                                    var sy2 = viz.originY + sp2[1] * viz.scale;
                                    if (j === 0) ctx.moveTo(sx2, sy2);
                                    else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // Draw geodesics from north pole
                            var northPole = sph(0, 0);
                            var npProj = project(northPole[0], northPole[1], northPole[2]);
                            var npx = viz.originX + npProj[0] * viz.scale;
                            var npy = viz.originY + npProj[1] * viz.scale;

                            // Draw individual geodesic rays
                            for (var g = 0; g < numGeodesics; g++) {
                                var azimuth = g * 2 * Math.PI / numGeodesics;
                                ctx.strokeStyle = viz.colors.blue + '66';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                var steps = 60;
                                for (var s = 0; s <= steps; s++) {
                                    var t = (s / steps) * radius;
                                    if (t > Math.PI) break;
                                    var pt3 = sph(t, azimuth);
                                    var sp3 = project(pt3[0], pt3[1], pt3[2]);
                                    var sx3 = viz.originX + sp3[0] * viz.scale;
                                    var sy3 = viz.originY + sp3[1] * viz.scale;
                                    if (s === 0) ctx.moveTo(sx3, sy3);
                                    else ctx.lineTo(sx3, sy3);
                                }
                                ctx.stroke();
                            }

                            // Draw geodesic circle at current radius
                            if (radius <= Math.PI) {
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var c = 0; c <= 80; c++) {
                                    var az = c * 2 * Math.PI / 80;
                                    var pt4 = sph(radius, az);
                                    var sp4 = project(pt4[0], pt4[1], pt4[2]);
                                    var sx4 = viz.originX + sp4[0] * viz.scale;
                                    var sy4 = viz.originY + sp4[1] * viz.scale;
                                    if (c === 0) ctx.moveTo(sx4, sy4);
                                    else ctx.lineTo(sx4, sy4);
                                }
                                ctx.closePath();
                                ctx.stroke();
                            }

                            // Draw north pole point
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(npx, npy, 5, 0, Math.PI * 2);
                            ctx.fill();

                            // Draw south pole point if radius reaches it
                            if (radius >= Math.PI - 0.05) {
                                var southPole = sph(Math.PI, 0);
                                var spProj = project(southPole[0], southPole[1], southPole[2]);
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.arc(viz.originX + spProj[0] * viz.scale, viz.originY + spProj[1] * viz.scale, 5, 0, Math.PI * 2);
                                ctx.fill();
                                viz.screenText('All geodesics converge at the antipodal point!', viz.width / 2, viz.height - 20, viz.colors.red, 12);
                            }

                            // Labels
                            viz.screenText('p (north pole)', npx + 10, npy - 12, viz.colors.orange, 11, 'left');
                            viz.screenText('Geodesic radius r = ' + radius.toFixed(2), viz.width / 2, 18, viz.colors.white, 13);

                            // Circumference comparison
                            var circGeodesic = 2 * Math.PI * Math.sin(radius);
                            var circEuclid = 2 * Math.PI * radius;
                            if (radius > 0.15 && radius < Math.PI) {
                                viz.screenText('Circumference: ' + circGeodesic.toFixed(2) + ' (Euclidean would be ' + circEuclid.toFixed(2) + ')', viz.width / 2, viz.height - 42, viz.colors.teal, 11);
                                viz.screenText('Positive curvature makes circles smaller than expected', viz.width / 2, viz.height - 24, viz.colors.text, 10);
                            }
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that a geodesic \\(\\gamma\\) satisfies \\(\\gamma_{cv}(t) = \\gamma_v(ct)\\) for any constant \\(c \\in \\mathbb{R}\\). That is, scaling the initial velocity reparametrizes the geodesic.',
                    hint: 'Define \\(\\sigma(t) = \\gamma_v(ct)\\) and verify that \\(\\sigma\\) satisfies the geodesic equation with initial velocity \\(cv\\). Use uniqueness.',
                    solution: 'Let \\(\\sigma(t) = \\gamma_v(ct)\\). Then \\(\\sigma(0) = \\gamma_v(0) = p\\) and \\(\\sigma\'(0) = c\\gamma_v\'(0) = cv\\). Compute \\(\\nabla_{\\sigma\'}\\sigma\' = c^2 \\nabla_{\\gamma_v\'}\\gamma_v\'|_{ct} = 0\\) since \\(\\gamma_v\\) is a geodesic. By uniqueness of the initial value problem, \\(\\sigma = \\gamma_{cv}\\).'
                },
                {
                    question: 'Verify that the equator \\(\\gamma(t) = (\\pi/2, t)\\) in spherical coordinates \\((\\theta, \\phi)\\) on \\(S^2\\) satisfies the geodesic equations \\(\\ddot{\\theta} - \\sin\\theta\\cos\\theta\\,\\dot{\\phi}^2 = 0\\) and \\(\\ddot{\\phi} + 2\\cot\\theta\\,\\dot{\\theta}\\dot{\\phi} = 0\\).',
                    hint: 'Compute \\(\\dot{\\theta}, \\ddot{\\theta}, \\dot{\\phi}, \\ddot{\\phi}\\) for this specific curve.',
                    solution: 'For \\(\\gamma(t) = (\\pi/2, t)\\): \\(\\dot{\\theta} = 0\\), \\(\\ddot{\\theta} = 0\\), \\(\\dot{\\phi} = 1\\), \\(\\ddot{\\phi} = 0\\). First equation: \\(0 - \\sin(\\pi/2)\\cos(\\pi/2) \\cdot 1 = 0 - 1 \\cdot 0 = 0\\). \\(\\checkmark\\) Second equation: \\(0 + 2\\cot(\\pi/2) \\cdot 0 \\cdot 1 = 0\\). \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Exponential Map
        // ================================================================
        {
            id: 'sec-exponential',
            title: 'The Exponential Map',
            content: `
<h2>The Exponential Map</h2>

<div class="env-block intuition">
    <div class="env-title">Shooting Geodesics</div>
    <div class="env-body">
        <p>Fix a point \\(p \\in M\\) and a tangent vector \\(v \\in T_pM\\). There is a unique geodesic \\(\\gamma_v\\) starting at \\(p\\) with velocity \\(v\\). The exponential map sends \\(v\\) to where the geodesic arrives at time \\(t = 1\\). Think of it as "shooting a ball from \\(p\\) in direction \\(v\\) with speed \\(|v|\\), and seeing where it lands at \\(t = 1\\)."</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Exponential Map)</div>
    <div class="env-body">
        <p>Let \\(p \\in M\\). The <strong>exponential map at \\(p\\)</strong> is</p>
        \\[\\exp_p : \\mathcal{U} \\subset T_pM \\to M, \\qquad \\exp_p(v) = \\gamma_v(1),\\]
        <p>where \\(\\gamma_v\\) is the geodesic with \\(\\gamma_v(0) = p\\), \\(\\gamma_v'(0) = v\\), and \\(\\mathcal{U}\\) is the set of vectors for which \\(\\gamma_v\\) is defined at \\(t = 1\\).</p>
    </div>
</div>

<p>By the rescaling property \\(\\gamma_{tv}(1) = \\gamma_v(t)\\), we have the important identity:</p>

\\[\\exp_p(tv) = \\gamma_v(t).\\]

<p>So \\(t \\mapsto \\exp_p(tv)\\) traces out the geodesic through \\(p\\) in direction \\(v\\).</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.4 (Properties of \\(\\exp_p\\))</div>
    <div class="env-body">
        <p>Let \\(p \\in M\\). Then:</p>
        <ol>
            <li>\\(\\exp_p(0) = p\\).</li>
            <li>\\(d(\\exp_p)_0 = \\mathrm{Id}_{T_pM}\\). That is, the differential of \\(\\exp_p\\) at the origin is the identity map.</li>
            <li>By the inverse function theorem, \\(\\exp_p\\) is a diffeomorphism from some neighborhood of \\(0 \\in T_pM\\) onto a neighborhood of \\(p \\in M\\).</li>
        </ol>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof of (2)</div>
    <div class="env-body">
        <p>Let \\(v \\in T_pM\\). The differential \\(d(\\exp_p)_0(v)\\) is computed as:</p>
        \\[d(\\exp_p)_0(v) = \\frac{d}{dt}\\bigg|_{t=0} \\exp_p(tv) = \\frac{d}{dt}\\bigg|_{t=0} \\gamma_v(t) = \\gamma_v'(0) = v.\\]
        <p>So \\(d(\\exp_p)_0\\) acts as the identity on every \\(v \\in T_pM\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(\\exp_p\\) on \\(\\mathbb{R}^n\\)</div>
    <div class="env-body">
        <p>In Euclidean space, geodesics are lines: \\(\\gamma_v(t) = p + tv\\). So \\(\\exp_p(v) = p + v\\). The exponential map is just translation, a global diffeomorphism.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(\\exp_p\\) on \\(S^2\\)</div>
    <div class="env-body">
        <p>At the north pole \\(N\\) of the unit sphere, \\(T_N S^2 \\cong \\mathbb{R}^2\\). The geodesic from \\(N\\) in direction \\(v\\) with \\(|v| = r\\) reaches the point at geodesic distance \\(r\\) from \\(N\\). The map \\(\\exp_N\\) is a diffeomorphism on the open ball \\(B_\\pi(0)\\) but collapses the entire circle \\(|v| = \\pi\\) to the south pole. This is the first hint of the <em>cut locus</em>.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-exponential-map"></div>
`,
            visualizations: [
                {
                    id: 'viz-exponential-map',
                    title: 'The Exponential Map: Shooting Geodesics',
                    description: 'The tangent plane at p (left) is mapped to the surface (right) via the exponential map. Drag the direction in the tangent plane to see which point on the surface the geodesic reaches at t=1.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var dirAngle = 0.3;
                        var magnitude = 1.5;

                        VizEngine.createSlider(controls, 'Direction', 0, 6.28, dirAngle, 0.05, function(v) {
                            dirAngle = v;
                        });
                        VizEngine.createSlider(controls, '|v|', 0.1, 3.0, magnitude, 0.05, function(v) {
                            magnitude = v;
                        });

                        // Project sphere point
                        function projectSphere(theta, phi) {
                            var x = Math.sin(theta) * Math.cos(phi);
                            var y = Math.sin(theta) * Math.sin(phi);
                            var z = Math.cos(theta);
                            return [x * 0.85 + z * 0.3, -y * 0.85 - z * 0.15];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // -- Left: Tangent plane at north pole --
                            var tpCx = 145, tpCy = 210, tpScale = 55;

                            // Background circle for tangent plane
                            ctx.fillStyle = viz.colors.grid + '44';
                            ctx.beginPath();
                            ctx.arc(tpCx, tpCy, tpScale * 3.2, 0, Math.PI * 2);
                            ctx.fill();

                            // Grid on tangent plane
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gi = -3; gi <= 3; gi++) {
                                ctx.beginPath();
                                ctx.moveTo(tpCx + gi * tpScale, tpCy - 3.2 * tpScale);
                                ctx.lineTo(tpCx + gi * tpScale, tpCy + 3.2 * tpScale);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(tpCx - 3.2 * tpScale, tpCy + gi * tpScale);
                                ctx.lineTo(tpCx + 3.2 * tpScale, tpCy + gi * tpScale);
                                ctx.stroke();
                            }

                            // Vector v in tangent plane
                            var vx = magnitude * Math.cos(dirAngle);
                            var vy = magnitude * Math.sin(dirAngle);
                            var endX = tpCx + vx * tpScale;
                            var endY = tpCy - vy * tpScale;

                            // Draw the vector
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.moveTo(tpCx, tpCy);
                            ctx.lineTo(endX, endY);
                            ctx.stroke();

                            // Arrowhead
                            var ang = Math.atan2(tpCy - endY, endX - tpCx);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(endX, endY);
                            ctx.lineTo(endX - 10 * Math.cos(ang - 0.4), endY + 10 * Math.sin(ang - 0.4));
                            ctx.lineTo(endX - 10 * Math.cos(ang + 0.4), endY + 10 * Math.sin(ang + 0.4));
                            ctx.closePath();
                            ctx.fill();

                            // Origin
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(tpCx, tpCy, 4, 0, Math.PI * 2);
                            ctx.fill();

                            // Endpoint marker
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.arc(endX, endY, 4, 0, Math.PI * 2);
                            ctx.fill();

                            viz.screenText('T_pM', tpCx, 28, viz.colors.white, 14);
                            viz.screenText('v', (tpCx + endX) / 2 + 10, (tpCy + endY) / 2 - 10, viz.colors.blue, 13);
                            viz.screenText('0', tpCx - 12, tpCy + 14, viz.colors.orange, 11);

                            // -- Arrow between panels --
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            ctx.moveTo(275, 210);
                            ctx.lineTo(305, 210);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.moveTo(310, 210);
                            ctx.lineTo(302, 205);
                            ctx.lineTo(302, 215);
                            ctx.closePath();
                            ctx.fill();
                            viz.screenText('exp_p', 293, 195, viz.colors.white, 11);

                            // -- Right: Sphere with geodesic --
                            var spCx = 420, spCy = 210, spScale = 110;

                            // Draw sphere wireframe
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var lat = 1; lat < 6; lat++) {
                                var th = lat * Math.PI / 6;
                                ctx.beginPath();
                                for (var i = 0; i <= 60; i++) {
                                    var ph = i * 2 * Math.PI / 60;
                                    var pr = projectSphere(th, ph);
                                    var sx = spCx + pr[0] * spScale;
                                    var sy = spCy + pr[1] * spScale;
                                    if (i === 0) ctx.moveTo(sx, sy);
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }
                            for (var lon = 0; lon < 12; lon++) {
                                var ph2 = lon * Math.PI / 6;
                                ctx.beginPath();
                                for (var j = 0; j <= 30; j++) {
                                    var th2 = j * Math.PI / 30;
                                    var pr2 = projectSphere(th2, ph2);
                                    var sx2 = spCx + pr2[0] * spScale;
                                    var sy2 = spCy + pr2[1] * spScale;
                                    if (j === 0) ctx.moveTo(sx2, sy2);
                                    else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // Draw geodesic on sphere
                            var geoTheta = magnitude; // geodesic distance = |v|
                            var geoPhi = dirAngle;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var gs = 0; gs <= 50; gs++) {
                                var tt = (gs / 50) * Math.min(geoTheta, Math.PI);
                                var gpr = projectSphere(tt, geoPhi);
                                var gsx = spCx + gpr[0] * spScale;
                                var gsy = spCy + gpr[1] * spScale;
                                if (gs === 0) ctx.moveTo(gsx, gsy);
                                else ctx.lineTo(gsx, gsy);
                            }
                            ctx.stroke();

                            // North pole
                            var npProj = projectSphere(0, 0);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(spCx + npProj[0] * spScale, spCy + npProj[1] * spScale, 5, 0, Math.PI * 2);
                            ctx.fill();

                            // exp_p(v) point
                            var expTheta = Math.min(geoTheta, Math.PI);
                            var expPr = projectSphere(expTheta, geoPhi);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.arc(spCx + expPr[0] * spScale, spCy + expPr[1] * spScale, 5, 0, Math.PI * 2);
                            ctx.fill();

                            viz.screenText('M (sphere)', spCx, 28, viz.colors.white, 14);
                            viz.screenText('p', spCx + npProj[0] * spScale + 10, spCy + npProj[1] * spScale - 12, viz.colors.orange, 11);
                            viz.screenText('exp_p(v)', spCx + expPr[0] * spScale + 12, spCy + expPr[1] * spScale - 10, viz.colors.teal, 11);

                            // Info
                            viz.screenText('|v| = ' + magnitude.toFixed(2) + '   geodesic distance = ' + magnitude.toFixed(2), viz.width / 2, viz.height - 16, viz.colors.text, 11);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(\\exp_p(0) = p\\) directly from the definition.',
                    hint: 'What is the geodesic with initial velocity \\(v = 0\\)?',
                    solution: 'The geodesic \\(\\gamma_0\\) with \\(\\gamma_0(0) = p\\) and \\(\\gamma_0\'(0) = 0\\) is the constant curve \\(\\gamma_0(t) = p\\) for all \\(t\\) (verify: \\(\\ddot{\\gamma}^k = 0\\) and \\(\\dot{\\gamma}^i = 0\\) so the geodesic equation is trivially satisfied). Thus \\(\\exp_p(0) = \\gamma_0(1) = p\\).'
                },
                {
                    question: 'For the hyperbolic plane \\(\\mathbb{H}^2\\) (upper half-plane with metric \\(ds^2 = (dx^2 + dy^2)/y^2\\)), find \\(\\exp_{(0,1)}(t\\partial_y)\\).',
                    hint: 'The geodesic from \\((0,1)\\) in the \\(\\partial_y\\) direction is the vertical line \\(x = 0\\). Solve the geodesic equation for the upper half-plane metric.',
                    solution: 'In the upper half-plane, vertical lines \\(x = \\text{const}\\) are geodesics parametrized as \\(\\gamma(t) = (0, e^t)\\) (one can verify \\(\\nabla_{\\gamma\'}\\gamma\' = 0\\) using \\(\\Gamma^2_{22} = -1/y\\), etc.). Starting at \\((0,1)\\) with \\(\\gamma\'(0) = \\partial_y\\), we get \\(\\exp_{(0,1)}(t\\partial_y) = (0, e^t)\\). The geodesic goes to \\(\\infty\\) as \\(t \\to \\infty\\) and to the boundary as \\(t \\to -\\infty\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Normal Coordinates
        // ================================================================
        {
            id: 'sec-normal-coordinates',
            title: 'Normal Coordinates',
            content: `
<h2>Riemannian Normal Coordinates</h2>

<div class="env-block intuition">
    <div class="env-title">Making Curved Space Look Flat</div>
    <div class="env-body">
        <p>Choose an orthonormal basis \\((e_1, \\ldots, e_n)\\) for \\(T_pM\\). Since \\(\\exp_p\\) is a local diffeomorphism near \\(0\\), we can use it to define coordinates: send \\(q = \\exp_p(v^i e_i)\\) to the tuple \\((v^1, \\ldots, v^n)\\). These are <strong>Riemannian normal coordinates</strong> centered at \\(p\\). In these coordinates, the geometry at \\(p\\) looks exactly Euclidean, and curvature appears only as a second-order correction.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Normal Coordinates)</div>
    <div class="env-body">
        <p>Let \\((e_1, \\ldots, e_n)\\) be an orthonormal basis for \\(T_pM\\). The <strong>Riemannian normal coordinates</strong> centered at \\(p\\) are the coordinates \\((x^1, \\ldots, x^n)\\) defined by</p>
        \\[\\phi^{-1}(x^1, \\ldots, x^n) = \\exp_p(x^i e_i).\\]
        <p>They are defined on the neighborhood where \\(\\exp_p\\) is a diffeomorphism.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.5 (Properties of Normal Coordinates)</div>
    <div class="env-body">
        <p>In Riemannian normal coordinates centered at \\(p\\):</p>
        <ol>
            <li>\\(g_{ij}(p) = \\delta_{ij}\\) (the metric is the identity at \\(p\\)).</li>
            <li>\\(\\Gamma^k_{ij}(p) = 0\\) (all Christoffel symbols vanish at \\(p\\)).</li>
            <li>\\(\\partial_k g_{ij}(p) = 0\\) (all first partial derivatives of the metric vanish at \\(p\\)).</li>
            <li>Geodesics through \\(p\\) are straight lines: \\(\\gamma_v(t) = (tv^1, \\ldots, tv^n)\\).</li>
        </ol>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>(1) follows from the choice of orthonormal basis and \\(d(\\exp_p)_0 = \\mathrm{Id}\\).</p>
        <p>(4) is immediate: \\(\\gamma_v(t) = \\exp_p(tv) = (tv^1, \\ldots, tv^n)\\) in normal coordinates.</p>
        <p>For (2), substitute \\(\\gamma(t) = (tv^1, \\ldots, tv^n)\\) into the geodesic equation: \\(\\ddot{\\gamma}^k = 0\\), so \\(\\Gamma^k_{ij}(tv) v^i v^j = 0\\) for all \\(t\\) and all \\(v\\). Setting \\(t = 0\\): \\(\\Gamma^k_{ij}(p) v^i v^j = 0\\) for all \\(v\\). By symmetry of \\(\\Gamma^k_{ij}\\) in \\(i, j\\), this forces \\(\\Gamma^k_{ij}(p) = 0\\).</p>
        <p>(3) follows from (2) and the formula \\(\\Gamma^k_{ij} = \\tfrac{1}{2} g^{kl}(\\partial_i g_{jl} + \\partial_j g_{il} - \\partial_l g_{ij})\\) with \\(g^{kl}(p) = \\delta^{kl}\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>The Gauss Lemma</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.6 (Gauss Lemma)</div>
    <div class="env-body">
        <p>In normal coordinates, radial geodesics are perpendicular to geodesic spheres. More precisely: if \\(v \\in T_pM\\) with \\(|v| = 1\\) and \\(w \\perp v\\), then</p>
        \\[g\\big(d(\\exp_p)_{tv}(v),\\, d(\\exp_p)_{tv}(w)\\big) = 0\\]
        <p>for all \\(t\\) in the domain of \\(\\exp_p\\).</p>
    </div>
</div>

<p>The Gauss lemma says that the exponential map preserves the orthogonality between radial and tangential directions. Radial geodesics always meet geodesic spheres at right angles, just as radii meet circles perpendicularly in Euclidean geometry.</p>

<div class="env-block remark">
    <div class="env-title">Taylor Expansion of the Metric</div>
    <div class="env-body">
        <p>In normal coordinates, the metric admits the expansion:</p>
        \\[g_{ij}(x) = \\delta_{ij} - \\frac{1}{3} R_{ikjl}(p)\\, x^k x^l + O(|x|^3).\\]
        <p>Curvature appears only at second order. This quantifies how "close to flat" the geometry is near \\(p\\): the Riemann tensor \\(R_{ikjl}\\) measures the leading deviation.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-normal-coordinates"></div>
`,
            visualizations: [
                {
                    id: 'viz-normal-coordinates',
                    title: 'Normal Coordinates: Geodesic Grid',
                    description: 'A grid of geodesics emanating from p on a surface. Near p the grid looks perfectly Cartesian. As you move further out, curvature distorts it. Adjust the curvature to see the effect.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 1
                        });

                        var curvature = 0.3;
                        var gridSize = 5;

                        VizEngine.createSlider(controls, 'Curvature K', -1, 1, curvature, 0.05, function(v) {
                            curvature = v;
                        });
                        VizEngine.createSlider(controls, 'Grid extent', 2, 8, gridSize, 1, function(v) {
                            gridSize = Math.round(v);
                        });

                        var baseScale = 30;

                        // Map normal coordinate (u,v) to screen, with curvature distortion
                        // K>0: geodesics converge (sphere-like); K<0: diverge (hyperbolic)
                        function normalToScreen(u, v) {
                            var r = Math.sqrt(u * u + v * v);
                            var factor;
                            if (Math.abs(curvature) < 0.001 || r < 0.001) {
                                factor = 1;
                            } else if (curvature > 0) {
                                var sqK = Math.sqrt(curvature);
                                factor = (r > 0.001) ? Math.sin(sqK * r) / (sqK * r) : 1;
                            } else {
                                var sqNK = Math.sqrt(-curvature);
                                factor = (r > 0.001) ? Math.sinh(sqNK * r) / (sqNK * r) : 1;
                            }
                            return [
                                viz.originX + u * factor * baseScale,
                                viz.originY - v * factor * baseScale
                            ];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Normal Coordinates (K = ' + curvature.toFixed(2) + ')', viz.width / 2, 18, viz.colors.white, 14);

                            // Draw coordinate grid lines
                            var steps = 40;
                            // u = const lines
                            for (var ui = -gridSize; ui <= gridSize; ui++) {
                                ctx.strokeStyle = (ui === 0) ? viz.colors.axis : viz.colors.blue + '44';
                                ctx.lineWidth = (ui === 0) ? 1.5 : 0.8;
                                ctx.beginPath();
                                for (var s = 0; s <= steps; s++) {
                                    var vv = -gridSize + 2 * gridSize * s / steps;
                                    var pt = normalToScreen(ui, vv);
                                    if (s === 0) ctx.moveTo(pt[0], pt[1]);
                                    else ctx.lineTo(pt[0], pt[1]);
                                }
                                ctx.stroke();
                            }
                            // v = const lines
                            for (var vi = -gridSize; vi <= gridSize; vi++) {
                                ctx.strokeStyle = (vi === 0) ? viz.colors.axis : viz.colors.teal + '44';
                                ctx.lineWidth = (vi === 0) ? 1.5 : 0.8;
                                ctx.beginPath();
                                for (var s2 = 0; s2 <= steps; s2++) {
                                    var uu = -gridSize + 2 * gridSize * s2 / steps;
                                    var pt2 = normalToScreen(uu, vi);
                                    if (s2 === 0) ctx.moveTo(pt2[0], pt2[1]);
                                    else ctx.lineTo(pt2[0], pt2[1]);
                                }
                                ctx.stroke();
                            }

                            // Draw geodesic circles
                            for (var cr = 1; cr <= gridSize; cr++) {
                                ctx.strokeStyle = viz.colors.orange + '55';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                for (var ci = 0; ci <= 80; ci++) {
                                    var angle = ci * 2 * Math.PI / 80;
                                    var cu = cr * Math.cos(angle);
                                    var cv = cr * Math.sin(angle);
                                    var cpt = normalToScreen(cu, cv);
                                    if (ci === 0) ctx.moveTo(cpt[0], cpt[1]);
                                    else ctx.lineTo(cpt[0], cpt[1]);
                                }
                                ctx.closePath();
                                ctx.stroke();
                            }

                            // Center point
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, 5, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('p', viz.originX + 10, viz.originY - 10, viz.colors.orange, 12);

                            // Legend
                            if (curvature > 0.05) {
                                viz.screenText('K > 0: geodesics converge (sphere-like)', viz.width / 2, viz.height - 40, viz.colors.text, 11);
                            } else if (curvature < -0.05) {
                                viz.screenText('K < 0: geodesics diverge (hyperbolic)', viz.width / 2, viz.height - 40, viz.colors.text, 11);
                            } else {
                                viz.screenText('K = 0: flat, coordinates are Cartesian', viz.width / 2, viz.height - 40, viz.colors.text, 11);
                            }
                            viz.screenText('Grid lines = coordinate curves; circles = geodesic spheres', viz.width / 2, viz.height - 20, viz.colors.text, 10);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In normal coordinates centered at \\(p\\), show that the Christoffel symbols satisfy \\(\\Gamma^k_{ij}(p) + \\Gamma^k_{ji}(p) = 0\\) and conclude that each \\(\\Gamma^k_{ij}(p) = 0\\).',
                    hint: 'Use the fact that \\(\\Gamma^k_{ij}(p) v^i v^j = 0\\) for all \\(v\\), and the symmetry \\(\\Gamma^k_{ij} = \\Gamma^k_{ji}\\) (torsion-free connection).',
                    solution: 'From the geodesic equation at \\(p\\): \\(\\Gamma^k_{ij}(p) v^i v^j = 0\\) for all \\(v\\). This is a quadratic form in \\(v\\). The associated symmetric bilinear form is \\(\\frac{1}{2}(\\Gamma^k_{ij} + \\Gamma^k_{ji})v^i w^j\\). Since \\(\\Gamma^k_{ij} = \\Gamma^k_{ji}\\) (Levi-Civita is torsion-free), the quadratic form vanishing for all \\(v\\) implies \\(\\Gamma^k_{ij}(p) = 0\\).'
                },
                {
                    question: 'Use the Taylor expansion \\(g_{ij}(x) = \\delta_{ij} - \\frac{1}{3}R_{ikjl}(p) x^k x^l + O(|x|^3)\\) to compute the area of a geodesic disk of radius \\(\\epsilon\\) in a 2-dimensional manifold to order \\(\\epsilon^4\\).',
                    hint: 'The area element is \\(\\sqrt{\\det g}\\, dx^1 dx^2\\). Expand \\(\\det g\\) using \\(\\det(I + A) \\approx 1 + \\mathrm{tr}(A)\\) for small \\(A\\). Integrate in polar coordinates.',
                    solution: 'In 2D, \\(\\det g = 1 - \\frac{1}{3}(R_{1k1l} + R_{2k2l})x^k x^l + O(|x|^3) = 1 - \\frac{1}{3}\\mathrm{Ric}_{kl} x^k x^l + \\cdots\\). For a 2-manifold, \\(\\mathrm{Ric}_{kl} = K g_{kl}\\) where \\(K\\) is Gaussian curvature. So \\(\\det g \\approx 1 - \\frac{K}{3}r^2\\), and \\(\\sqrt{\\det g} \\approx 1 - \\frac{K}{6}r^2\\). Integrating: \\(\\mathrm{Area} = \\int_0^{2\\pi}\\int_0^\\epsilon (1 - \\frac{K}{6}r^2)r\\,dr\\,d\\theta = \\pi\\epsilon^2 - \\frac{\\pi K}{12}\\epsilon^4 + O(\\epsilon^6)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Completeness
        // ================================================================
        {
            id: 'sec-completeness',
            title: 'Completeness',
            content: `
<h2>Geodesic Completeness and the Hopf-Rinow Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">When Can Geodesics Extend Forever?</div>
    <div class="env-body">
        <p>On \\(\\mathbb{R}^n\\), every geodesic (straight line) extends to \\(t \\in (-\\infty, \\infty)\\). On the punctured plane \\(\\mathbb{R}^2 \\setminus \\{0\\}\\), a geodesic aimed at the origin "falls off" the manifold in finite time. <strong>Completeness</strong> is the property that all geodesics extend forever, and the Hopf-Rinow theorem gives us equivalent conditions.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Geodesically Complete)</div>
    <div class="env-body">
        <p>A Riemannian manifold \\((M, g)\\) is <strong>geodesically complete</strong> if for every \\(p \\in M\\) and every \\(v \\in T_pM\\), the geodesic \\(\\gamma_v(t)\\) is defined for all \\(t \\in (-\\infty, \\infty)\\). Equivalently, \\(\\exp_p\\) is defined on all of \\(T_pM\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Metrically Complete)</div>
    <div class="env-body">
        <p>A Riemannian manifold \\((M, g)\\) is <strong>metrically complete</strong> if it is complete as a metric space under the Riemannian distance function \\(d(p, q) = \\inf \\{L(\\gamma) : \\gamma \\text{ is a piecewise smooth curve from } p \\text{ to } q\\}\\). That is, every Cauchy sequence converges.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.7 (Hopf-Rinow)</div>
    <div class="env-body">
        <p>For a connected Riemannian manifold \\((M, g)\\), the following are equivalent:</p>
        <ol>
            <li>\\(M\\) is geodesically complete.</li>
            <li>\\(\\exp_p\\) is defined on all of \\(T_pM\\) for some \\(p \\in M\\).</li>
            <li>\\(M\\) is metrically complete (complete as a metric space).</li>
            <li>Every closed and bounded subset of \\(M\\) is compact.</li>
        </ol>
        <p>Moreover, if any of these hold, then any two points in \\(M\\) can be connected by a minimizing geodesic.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Key Implications</div>
    <div class="env-body">
        <p>The Hopf-Rinow theorem is remarkable because it connects three different notions of "completeness": geodesic, metric, and topological. For compact manifolds, completeness is automatic (closed and bounded subsets are compact). So every compact Riemannian manifold is geodesically complete.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Complete Manifolds</div>
    <div class="env-body">
        <ul>
            <li>\\(\\mathbb{R}^n\\): complete (geodesics are infinite lines).</li>
            <li>\\(S^n\\): complete (compact, hence Hopf-Rinow applies).</li>
            <li>\\(\\mathbb{H}^n\\) (hyperbolic space): complete (geodesics extend forever even though the space is not compact).</li>
            <li>Any compact Riemannian manifold: complete by Hopf-Rinow.</li>
        </ul>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Incomplete Manifolds</div>
    <div class="env-body">
        <ul>
            <li>\\(\\mathbb{R}^2 \\setminus \\{0\\}\\): geodesics through the origin terminate in finite time.</li>
            <li>An open disk \\(B_1(0) \\subset \\mathbb{R}^2\\): geodesics reach the boundary in finite time.</li>
            <li>A cone with the tip removed: geodesics approaching the tip cannot be extended.</li>
        </ul>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-geodesic-completeness"></div>
<div class="viz-placeholder" data-viz="viz-hopf-rinow"></div>
`,
            visualizations: [
                {
                    id: 'viz-geodesic-completeness',
                    title: 'Complete vs. Incomplete Manifolds',
                    description: 'Left: geodesics on a complete manifold extend forever. Right: on an incomplete manifold (punctured plane), a geodesic aimed at the missing point terminates in finite time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var time = 0;
                        var speed = 1;

                        VizEngine.createSlider(controls, 'Speed', 0.2, 3, speed, 0.1, function(v) {
                            speed = v;
                        });

                        function draw(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            time += 0.008 * speed;

                            // --- Left panel: Complete (R^2) ---
                            var lcx = 145, lcy = 200, lsc = 35;

                            viz.screenText('Complete: R\u00B2', lcx, 22, viz.colors.green, 13);

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gx = -3; gx <= 3; gx++) {
                                ctx.beginPath();
                                ctx.moveTo(lcx + gx * lsc, lcy - 4 * lsc);
                                ctx.lineTo(lcx + gx * lsc, lcy + 4 * lsc);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(lcx - 3 * lsc, lcy + gx * lsc);
                                ctx.lineTo(lcx + 3 * lsc, lcy + gx * lsc);
                                ctx.stroke();
                            }

                            // Draw several geodesics extending outward
                            var nRays = 8;
                            var rayLen = 3 + 1.5 * Math.sin(time * 0.5);
                            for (var r = 0; r < nRays; r++) {
                                var angle = r * 2 * Math.PI / nRays;
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(lcx, lcy);
                                ctx.lineTo(lcx + rayLen * lsc * Math.cos(angle), lcy - rayLen * lsc * Math.sin(angle));
                                ctx.stroke();

                                // Moving point
                                var ptDist = ((time * 0.7 + r * 0.3) % 3.5);
                                var ptx = lcx + ptDist * lsc * Math.cos(angle);
                                var pty = lcy - ptDist * lsc * Math.sin(angle);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.arc(ptx, pty, 3, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Origin
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(lcx, lcy, 4, 0, Math.PI * 2);
                            ctx.fill();

                            viz.screenText('Geodesics extend forever', lcx, viz.height - 30, viz.colors.green, 10);

                            // --- Right panel: Incomplete (R^2 \ {0}) ---
                            var rcx = 415, rcy = 200, rsc = 35;

                            viz.screenText('Incomplete: R\u00B2 \\ {0}', rcx, 22, viz.colors.red, 13);

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gx2 = -3; gx2 <= 3; gx2++) {
                                ctx.beginPath();
                                ctx.moveTo(rcx + gx2 * rsc, rcy - 4 * rsc);
                                ctx.lineTo(rcx + gx2 * rsc, rcy + 4 * rsc);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(rcx - 3 * rsc, rcy + gx2 * rsc);
                                ctx.lineTo(rcx + 3 * rsc, rcy + gx2 * rsc);
                                ctx.stroke();
                            }

                            // Puncture at origin
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(rcx, rcy, 8, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.bg;
                            ctx.beginPath();
                            ctx.arc(rcx, rcy, 7, 0, Math.PI * 2);
                            ctx.fill();

                            // Geodesic that hits the puncture
                            var startPt = [-2.5, 1.0];
                            var dir = [1, -0.4]; // aimed roughly at origin
                            var dirLen = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1]);
                            dir[0] /= dirLen; dir[1] /= dirLen;

                            // Distance to closest approach to origin
                            var maxT = Math.sqrt(startPt[0] * startPt[0] + startPt[1] * startPt[1]) * 0.95;

                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var si = 0; si <= 50; si++) {
                                var tt = (si / 50) * maxT;
                                var px = startPt[0] + dir[0] * tt;
                                var py = startPt[1] + dir[1] * tt;
                                var sx = rcx + px * rsc;
                                var sy = rcy - py * rsc;
                                if (si === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Moving point that reaches the hole and vanishes
                            var pointT = ((time * 0.5) % 2.5);
                            if (pointT < maxT) {
                                var ppx = startPt[0] + dir[0] * pointT;
                                var ppy = startPt[1] + dir[1] * pointT;
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.arc(rcx + ppx * rsc, rcy - ppy * rsc, 3, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Non-problematic geodesic (avoids origin)
                            ctx.strokeStyle = viz.colors.green + '88';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            for (var si2 = 0; si2 <= 50; si2++) {
                                var tt2 = -3 + 6 * si2 / 50;
                                var sx2 = rcx + tt2 * rsc;
                                var sy2 = rcy - 2 * rsc;
                                if (si2 === 0) ctx.moveTo(sx2, sy2);
                                else ctx.lineTo(sx2, sy2);
                            }
                            ctx.stroke();

                            // Start point
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(rcx + startPt[0] * rsc, rcy - startPt[1] * rsc, 4, 0, Math.PI * 2);
                            ctx.fill();

                            viz.screenText('Geodesic terminates at the puncture', rcx, viz.height - 30, viz.colors.red, 10);

                            // Divider
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(280, 40);
                            ctx.lineTo(280, viz.height - 10);
                            ctx.stroke();
                            ctx.setLineDash([]);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-hopf-rinow',
                    title: 'Hopf-Rinow: Compact Implies Complete',
                    description: 'On a compact manifold (torus shown here), every geodesic extends forever, wrapping around the surface. The animation traces a geodesic on a torus that never terminates.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 1
                        });

                        var traceSpeed = 0.5;
                        var slopeRatio = 0.4;

                        VizEngine.createSlider(controls, 'Speed', 0.1, 2, traceSpeed, 0.05, function(v) {
                            traceSpeed = v;
                        });
                        VizEngine.createSlider(controls, 'Slope', 0.1, 2.0, slopeRatio, 0.05, function(v) {
                            slopeRatio = v;
                        });

                        var R = 100, r = 45; // major, minor radii for torus
                        var time = 0;

                        // Torus parametrization: (u, v) -> 3D -> projected 2D
                        function torusPoint(u, v) {
                            var x = (R + r * Math.cos(v)) * Math.cos(u);
                            var y = (R + r * Math.cos(v)) * Math.sin(u);
                            var z = r * Math.sin(v);
                            // Oblique projection
                            return [
                                viz.originX + x * 0.9 + z * 0.3,
                                viz.originY - y * 0.35 - z * 0.7
                            ];
                        }

                        function draw(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            time += 0.005 * traceSpeed;

                            viz.screenText('Geodesic on a Torus (compact, hence complete)', viz.width / 2, 18, viz.colors.white, 13);

                            // Draw torus wireframe
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            // u-circles
                            for (var ui = 0; ui < 24; ui++) {
                                var u = ui * 2 * Math.PI / 24;
                                ctx.beginPath();
                                for (var vi = 0; vi <= 40; vi++) {
                                    var v = vi * 2 * Math.PI / 40;
                                    var pt = torusPoint(u, v);
                                    if (vi === 0) ctx.moveTo(pt[0], pt[1]);
                                    else ctx.lineTo(pt[0], pt[1]);
                                }
                                ctx.stroke();
                            }
                            // v-circles
                            for (var vi2 = 0; vi2 < 12; vi2++) {
                                var vv = vi2 * 2 * Math.PI / 12;
                                ctx.beginPath();
                                for (var ui2 = 0; ui2 <= 60; ui2++) {
                                    var uu = ui2 * 2 * Math.PI / 60;
                                    var pt2 = torusPoint(uu, vv);
                                    if (ui2 === 0) ctx.moveTo(pt2[0], pt2[1]);
                                    else ctx.lineTo(pt2[0], pt2[1]);
                                }
                                ctx.stroke();
                            }

                            // Draw geodesic trace
                            // On a flat torus, geodesics are lines with slope dv/du = slopeRatio
                            var totalArc = time * 20;
                            var traceSteps = Math.min(800, Math.floor(totalArc * 10));
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var started = false;
                            for (var gs = 0; gs <= traceSteps; gs++) {
                                var param = gs * 0.03;
                                var gu = param;
                                var gv = param * slopeRatio;
                                var gpt = torusPoint(gu, gv);
                                if (!started) { ctx.moveTo(gpt[0], gpt[1]); started = true; }
                                else ctx.lineTo(gpt[0], gpt[1]);
                            }
                            ctx.stroke();

                            // Current point
                            var curParam = traceSteps * 0.03;
                            var curPt = torusPoint(curParam, curParam * slopeRatio);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(curPt[0], curPt[1], 5, 0, Math.PI * 2);
                            ctx.fill();

                            // Start point
                            var startPt = torusPoint(0, 0);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(startPt[0], startPt[1], 4, 0, Math.PI * 2);
                            ctx.fill();

                            viz.screenText('The geodesic wraps around forever, never terminating', viz.width / 2, viz.height - 20, viz.colors.teal, 11);

                            var irrational = (Math.abs(slopeRatio - Math.round(slopeRatio * 4) / 4) > 0.08);
                            if (irrational) {
                                viz.screenText('Irrational slope: geodesic is dense (fills the torus)', viz.width / 2, viz.height - 40, viz.colors.text, 10);
                            } else {
                                viz.screenText('Rational slope: geodesic closes up', viz.width / 2, viz.height - 40, viz.colors.text, 10);
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the open unit disk \\(D = \\{(x,y) : x^2 + y^2 < 1\\}\\) with the Euclidean metric is not geodesically complete.',
                    hint: 'Exhibit a geodesic that reaches the boundary in finite time.',
                    solution: 'The geodesic \\(\\gamma(t) = (t, 0)\\) starts at the origin with \\(\\gamma\'(0) = (1,0)\\). It reaches the boundary at \\(t = 1\\) and cannot be extended further within \\(D\\). Hence \\(D\\) is not geodesically complete. Note: the same disk with the Poincare metric \\(ds^2 = 4(dx^2+dy^2)/(1-x^2-y^2)^2\\) IS complete, because geodesics slow down (in Euclidean terms) as they approach the boundary.'
                },
                {
                    question: 'Use Hopf-Rinow to prove that any two points on a compact connected Riemannian manifold can be joined by a minimizing geodesic.',
                    hint: 'A compact Riemannian manifold satisfies condition (4) of Hopf-Rinow automatically.',
                    solution: 'A compact manifold is a compact metric space (the Riemannian distance is continuous and the topology agrees). In a compact metric space, every closed and bounded subset is compact (since the entire space is compact and closed subsets of compact spaces are compact). By Hopf-Rinow condition (4), \\(M\\) is geodesically complete. The "moreover" clause then guarantees that any two points can be joined by a minimizing geodesic.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Minimizing Geodesics
        // ================================================================
        {
            id: 'sec-minimizing',
            title: 'Minimizing Geodesics',
            content: `
<h2>Minimizing Geodesics and the Cut Locus</h2>

<div class="env-block intuition">
    <div class="env-title">When Does "Straight" Mean "Shortest"?</div>
    <div class="env-body">
        <p>A geodesic always "goes straight" in the sense of zero acceleration. But it does not always minimize length. On a sphere, the short arc of a great circle from the north pole to a point in the southern hemisphere is a minimizing geodesic; the long arc (going the other way around) is still a geodesic but is not length-minimizing. The <strong>cut locus</strong> marks the boundary beyond which geodesics from \\(p\\) cease to minimize.</p>
    </div>
</div>

<div class="env-block theorem">
    <div name="env-title">Theorem 16.8 (Geodesics Are Locally Minimizing)</div>
    <div class="env-body">
        <p>Every geodesic is locally length-minimizing. That is, for any geodesic \\(\\gamma\\) and any \\(t_0\\) in its domain, there exists \\(\\epsilon > 0\\) such that \\(\\gamma|_{[t_0, t_0 + \\epsilon]}\\) is the shortest path between its endpoints.</p>
    </div>
</div>

<p>The proof uses the fact that in normal coordinates centered at \\(\\gamma(t_0)\\), the geodesic is a straight line, and straight lines minimize length in a sufficiently small neighborhood (this follows from the Gauss lemma).</p>

<h3>The Cut Locus</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Cut Point and Cut Locus)</div>
    <div class="env-body">
        <p>Let \\(\\gamma_v\\) be the geodesic from \\(p\\) with initial velocity \\(v\\) (unit speed). The <strong>cut point</strong> of \\(p\\) along \\(\\gamma_v\\) is the point \\(\\gamma_v(t_0)\\) beyond which \\(\\gamma_v\\) ceases to minimize distance from \\(p\\):</p>
        \\[t_{\\mathrm{cut}}(v) = \\sup\\{t > 0 : \\gamma_v|_{[0,t]} \\text{ minimizes distance from } p\\}.\\]
        <p>The <strong>cut locus</strong> of \\(p\\) is</p>
        \\[\\mathrm{Cut}(p) = \\{\\gamma_v(t_{\\mathrm{cut}}(v)) : v \\in T_pM, |v| = 1, \\, t_{\\mathrm{cut}}(v) < \\infty\\}.\\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.9 (Characterization of Cut Points)</div>
    <div class="env-body">
        <p>A point \\(q = \\gamma_v(t_0)\\) is the cut point of \\(p\\) along \\(\\gamma_v\\) if and only if at least one of the following holds:</p>
        <ol>
            <li>\\(q\\) is the first <strong>conjugate point</strong> of \\(p\\) along \\(\\gamma_v\\) (where \\(d(\\exp_p)\\) becomes singular).</li>
            <li>There exists another geodesic from \\(p\\) to \\(q\\) of the same length as \\(\\gamma_v|_{[0,t_0]}\\).</li>
        </ol>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Cut Locus on \\(S^2\\)</div>
    <div class="env-body">
        <p>On the unit sphere, the cut locus of the north pole \\(N\\) is the single point: the south pole \\(S\\). Every great circle from \\(N\\) reaches \\(S\\) at distance \\(\\pi\\), and both conditions of Theorem 16.9 hold simultaneously: \\(S\\) is a conjugate point, and infinitely many geodesics of length \\(\\pi\\) connect \\(N\\) to \\(S\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Cut Locus on a Flat Torus</div>
    <div class="env-body">
        <p>On the flat torus \\(\\mathbb{R}^2 / \\mathbb{Z}^2\\), the cut locus of any point is a figure-eight (or more precisely, a square boundary). There are no conjugate points (the torus is flat), so cut points arise entirely from the existence of multiple minimizing geodesics (corresponding to different "unwrapped" straight-line paths in \\(\\mathbb{R}^2\\)).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-cut-locus"></div>
`,
            visualizations: [
                {
                    id: 'viz-cut-locus',
                    title: 'The Cut Locus',
                    description: 'Visualize cut loci on different surfaces. On the sphere, the cut locus of the north pole is just the south pole. Toggle between surfaces to compare.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 1
                        });

                        var surface = 0; // 0 = sphere, 1 = torus (flat, shown as square)

                        VizEngine.createButton(controls, 'Sphere', function() { surface = 0; draw(); });
                        VizEngine.createButton(controls, 'Flat Torus', function() { surface = 1; draw(); });

                        function projectSphere(theta, phi) {
                            var x = Math.sin(theta) * Math.cos(phi);
                            var y = Math.sin(theta) * Math.sin(phi);
                            var z = Math.cos(theta);
                            return [x * 0.85 + z * 0.3, -y * 0.85 - z * 0.15];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            if (surface === 0) {
                                // -- Sphere --
                                viz.screenText('Cut Locus on S\u00B2: North Pole -> South Pole', viz.width / 2, 22, viz.colors.white, 14);

                                var spScale = 130;
                                // Wireframe
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                for (var lat = 1; lat < 6; lat++) {
                                    var th = lat * Math.PI / 6;
                                    ctx.beginPath();
                                    for (var i = 0; i <= 60; i++) {
                                        var ph = i * 2 * Math.PI / 60;
                                        var pr = projectSphere(th, ph);
                                        var sx = viz.originX + pr[0] * spScale;
                                        var sy = viz.originY + pr[1] * spScale;
                                        if (i === 0) ctx.moveTo(sx, sy);
                                        else ctx.lineTo(sx, sy);
                                    }
                                    ctx.stroke();
                                }
                                for (var lon = 0; lon < 12; lon++) {
                                    var ph2 = lon * Math.PI / 6;
                                    ctx.beginPath();
                                    for (var j = 0; j <= 30; j++) {
                                        var th2 = j * Math.PI / 30;
                                        var pr2 = projectSphere(th2, ph2);
                                        var sx2 = viz.originX + pr2[0] * spScale;
                                        var sy2 = viz.originY + pr2[1] * spScale;
                                        if (j === 0) ctx.moveTo(sx2, sy2);
                                        else ctx.lineTo(sx2, sy2);
                                    }
                                    ctx.stroke();
                                }

                                // Geodesics from north pole to south pole
                                var nGeo = 16;
                                for (var g = 0; g < nGeo; g++) {
                                    var az = g * 2 * Math.PI / nGeo;
                                    ctx.strokeStyle = viz.colors.blue + '55';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    for (var gs = 0; gs <= 40; gs++) {
                                        var tt = gs * Math.PI / 40;
                                        var gpr = projectSphere(tt, az);
                                        var gsx = viz.originX + gpr[0] * spScale;
                                        var gsy = viz.originY + gpr[1] * spScale;
                                        if (gs === 0) ctx.moveTo(gsx, gsy);
                                        else ctx.lineTo(gsx, gsy);
                                    }
                                    ctx.stroke();
                                }

                                // Minimizing segment (bold, up to pi/2)
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                for (var ms = 0; ms <= 20; ms++) {
                                    var mt = ms * Math.PI / 40; // half of great circle
                                    var mpr = projectSphere(mt, 0);
                                    if (ms === 0) ctx.moveTo(viz.originX + mpr[0] * spScale, viz.originY + mpr[1] * spScale);
                                    else ctx.lineTo(viz.originX + mpr[0] * spScale, viz.originY + mpr[1] * spScale);
                                }
                                ctx.stroke();

                                // North pole
                                var npPr = projectSphere(0, 0);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.arc(viz.originX + npPr[0] * spScale, viz.originY + npPr[1] * spScale, 6, 0, Math.PI * 2);
                                ctx.fill();
                                viz.screenText('N (source)', viz.originX + npPr[0] * spScale + 12, viz.originY + npPr[1] * spScale - 12, viz.colors.orange, 11);

                                // South pole (cut locus)
                                var spPr = projectSphere(Math.PI, 0);
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.arc(viz.originX + spPr[0] * spScale, viz.originY + spPr[1] * spScale, 6, 0, Math.PI * 2);
                                ctx.fill();
                                viz.screenText('S (cut locus)', viz.originX + spPr[0] * spScale + 12, viz.originY + spPr[1] * spScale + 14, viz.colors.red, 11);

                                viz.screenText('All geodesics from N reach S at distance \u03C0', viz.width / 2, viz.height - 40, viz.colors.text, 11);
                                viz.screenText('Cut(N) = {S}: a single point', viz.width / 2, viz.height - 20, viz.colors.red, 12);

                            } else {
                                // -- Flat torus (shown as fundamental domain) --
                                viz.screenText('Cut Locus on Flat Torus T\u00B2', viz.width / 2, 22, viz.colors.white, 14);

                                var boxL = 100, boxT = 60, boxW = 360, boxH = 300;

                                // Fundamental domain
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(boxL, boxT, boxW, boxH);

                                // Identify edges labels
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('identified', boxL + boxW / 2, boxT - 6);
                                ctx.fillText('identified', boxL + boxW / 2, boxT + boxH + 14);
                                ctx.save();
                                ctx.translate(boxL - 8, boxT + boxH / 2);
                                ctx.rotate(-Math.PI / 2);
                                ctx.fillText('identified', 0, 0);
                                ctx.restore();
                                ctx.save();
                                ctx.translate(boxL + boxW + 12, boxT + boxH / 2);
                                ctx.rotate(-Math.PI / 2);
                                ctx.fillText('identified', 0, 0);
                                ctx.restore();

                                // Source point at center
                                var px = boxL + boxW / 2, py = boxT + boxH / 2;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.arc(px, py, 5, 0, Math.PI * 2);
                                ctx.fill();
                                viz.screenText('p', px + 8, py - 8, viz.colors.orange, 12);

                                // Cut locus: diamond shape (half-way to edges)
                                var hw = boxW / 4, hh = boxH / 4;
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(px - hw, py); // left
                                ctx.lineTo(px, py - hh); // top
                                ctx.lineTo(px + hw, py); // right
                                ctx.lineTo(px, py + hh); // bottom
                                ctx.closePath();
                                ctx.stroke();

                                // Fill lightly
                                ctx.fillStyle = viz.colors.red + '11';
                                ctx.beginPath();
                                ctx.moveTo(px - hw, py);
                                ctx.lineTo(px, py - hh);
                                ctx.lineTo(px + hw, py);
                                ctx.lineTo(px, py + hh);
                                ctx.closePath();
                                ctx.fill();

                                // Some geodesic rays
                                var nRays = 12;
                                for (var ri = 0; ri < nRays; ri++) {
                                    var angle = ri * 2 * Math.PI / nRays;
                                    ctx.strokeStyle = viz.colors.blue + '44';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(px, py);
                                    var rayLen = 200;
                                    ctx.lineTo(px + rayLen * Math.cos(angle), py - rayLen * Math.sin(angle));
                                    ctx.stroke();
                                }

                                viz.screenText('Cut locus is a diamond (no conjugate points; only multiple shortest paths)', viz.width / 2, viz.height - 20, viz.colors.red, 10);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'On the unit sphere \\(S^2\\), find the cut locus of an arbitrary point \\(p\\). What is the injectivity radius?',
                    hint: 'By symmetry, the cut locus of any point on the sphere is its antipodal point. The injectivity radius is the distance to the cut locus.',
                    solution: 'By the rotational symmetry of \\(S^2\\), the cut locus of any point \\(p\\) is its antipodal point \\(-p\\), at geodesic distance \\(\\pi\\). The injectivity radius is \\(\\mathrm{inj}(p) = \\pi\\) for all \\(p\\), so \\(\\mathrm{inj}(S^2) = \\pi\\).'
                },
                {
                    question: 'Show that a geodesic on a complete manifold that is globally length-minimizing must be a ray (i.e., it has no cut point).',
                    hint: 'If \\(\\gamma\\) had a cut point at \\(t_0\\), what would happen for \\(t > t_0\\)?',
                    solution: 'If \\(\\gamma_v\\) has a cut point at \\(t_0\\), then for any \\(t > t_0\\), \\(\\gamma_v|_{[0,t]}\\) does not minimize distance from \\(p\\) to \\(\\gamma_v(t)\\). There exists a shorter path, so \\(\\gamma\\) is not globally minimizing for \\(t > t_0\\). Contrapositive: if \\(\\gamma\\) is globally minimizing on \\([0, \\infty)\\), it has no cut point, i.e., it is a ray.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to the Next Chapter
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>From Geodesics to Curvature</h2>

<div class="env-block intuition">
    <div class="env-title">What We Have Built</div>
    <div class="env-body">
        <p>Starting from the Levi-Civita connection of Chapter 15, we defined geodesics as "straight lines" (\\(\\nabla_{\\gamma'}\\gamma' = 0\\)), built the exponential map that shoots these lines from a point, used it to construct normal coordinates where the geometry is locally Euclidean, and proved the Hopf-Rinow theorem linking completeness conditions. We also saw that geodesics are only <em>locally</em> minimizing, with the cut locus marking the global boundary.</p>
    </div>
</div>

<h3>What Comes Next</h3>

<p>In Chapter 17, we turn to <strong>curvature tensors</strong>. We have already seen curvature lurking in two places:</p>
<ul>
    <li>The Taylor expansion of the metric in normal coordinates: \\(g_{ij}(x) = \\delta_{ij} - \\frac{1}{3}R_{ikjl}\\, x^k x^l + \\cdots\\)</li>
    <li>The deviation of geodesic circles from their Euclidean radii: the circumference of a geodesic circle of radius \\(r\\) on \\(S^2\\) is \\(2\\pi \\sin r < 2\\pi r\\).</li>
</ul>

<p>Chapter 17 will make the Riemann curvature tensor \\(R\\) precise, derive its symmetries, and extract its contractions (Ricci and scalar curvature). The interplay between curvature and geodesic behavior will deepen further in Chapter 18 (Jacobi fields), where we study how <em>families</em> of geodesics spread apart or converge.</p>

<div class="env-block remark">
    <div class="env-title">The Big Picture</div>
    <div class="env-body">
        <p>The sequence connection \\(\\to\\) geodesics \\(\\to\\) curvature \\(\\to\\) Jacobi fields \\(\\to\\) comparison theorems forms the backbone of Riemannian geometry. Each concept builds on the previous. Geodesics are the "test particles" of the geometry; curvature tells us how the geometry bends; Jacobi fields quantify how nearby geodesics diverge or focus; and comparison theorems translate curvature bounds into global geometric and topological conclusions.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(\\gamma\\) be a unit-speed geodesic on a surface with Gaussian curvature \\(K\\). The circumference of a geodesic circle of radius \\(r\\) centered at \\(\\gamma(0)\\) is \\(C(r) = 2\\pi r - \\frac{\\pi K}{3} r^3 + O(r^5)\\). Verify this for \\(S^2\\) (\\(K = 1\\)) against the exact formula \\(C(r) = 2\\pi \\sin r\\).',
                    hint: 'Taylor expand \\(\\sin r\\) around \\(r = 0\\) to third order.',
                    solution: '\\(2\\pi \\sin r = 2\\pi(r - r^3/6 + \\cdots) = 2\\pi r - \\frac{\\pi}{3} r^3 + O(r^5)\\). With \\(K = 1\\): \\(2\\pi r - \\frac{\\pi \\cdot 1}{3} r^3 = 2\\pi r - \\frac{\\pi}{3}r^3\\). \\(\\checkmark\\) The formula matches to third order, as expected from the normal coordinate expansion.'
                },
                {
                    question: 'On the hyperbolic plane \\(\\mathbb{H}^2\\) (\\(K = -1\\)), what is the circumference of a geodesic circle of radius \\(r\\)? Compare with the Euclidean value \\(2\\pi r\\).',
                    hint: 'The exact formula on \\(\\mathbb{H}^2\\) is \\(C(r) = 2\\pi \\sinh r\\). Compare with the approximate formula using \\(K = -1\\).',
                    solution: 'Exact: \\(C(r) = 2\\pi \\sinh r = 2\\pi(r + r^3/6 + \\cdots)\\). Approximation: \\(2\\pi r - \\frac{\\pi(-1)}{3}r^3 = 2\\pi r + \\frac{\\pi}{3}r^3\\). These match to third order (\\(\\pi/3 = 2\\pi/6\\)). \\(\\checkmark\\) For \\(K < 0\\), geodesic circles are <em>larger</em> than Euclidean circles: \\(\\sinh r > r\\). Negative curvature causes geodesics to diverge, inflating the circumference.'
                }
            ]
        }
    ]
});
