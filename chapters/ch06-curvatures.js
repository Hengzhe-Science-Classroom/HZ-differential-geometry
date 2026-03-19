window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch06',
    number: 6,
    title: 'Gaussian & Mean Curvature',
    subtitle: 'K and H: the two fundamental curvatures',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Two Curvatures?</h2>

<div class="env-block intuition">
    <div class="env-title">The Shape Operator's Fingerprint</div>
    <div class="env-body">
        <p>In Chapter 5 we met the shape operator \\(S = -dN\\), a linear map on each tangent plane that encodes how the normal field twists as we move along the surface. As a \\(2 \\times 2\\) operator, \\(S\\) has two eigenvalues \\(\\kappa_1, \\kappa_2\\) (the principal curvatures) and two fundamental scalar invariants: its <strong>determinant</strong> and its <strong>trace</strong>.</p>
        <p>These two invariants give us the Gaussian curvature \\(K\\) and the mean curvature \\(H\\). Together they capture everything a single number can say about the local shape of a surface.</p>
    </div>
</div>

<p>A curve has one curvature \\(\\kappa\\). A surface, being two-dimensional, bends independently in two directions, so it needs two curvature numbers. But the principal curvatures \\(\\kappa_1, \\kappa_2\\) depend on the choice of principal directions. The genius of \\(K\\) and \\(H\\) is that they are <strong>invariant</strong> under rotation of the tangent plane: they depend only on the surface itself, not on any particular coordinate system.</p>

<p>The two curvatures play fundamentally different roles:</p>
<ul>
    <li><strong>Gaussian curvature \\(K = \\kappa_1 \\kappa_2\\)</strong> is <em>intrinsic</em>: it can be computed from measurements made entirely within the surface, without reference to the ambient space \\(\\mathbb{R}^3\\). This is Gauss's Theorema Egregium (Chapter 8).</li>
    <li><strong>Mean curvature \\(H = \\frac{1}{2}(\\kappa_1 + \\kappa_2)\\)</strong> is <em>extrinsic</em>: it depends on how the surface sits in \\(\\mathbb{R}^3\\). It governs soap films and area-minimizing surfaces (Chapter 10).</li>
</ul>

<div class="env-block remark">
    <div class="env-title">Physical Intuition</div>
    <div class="env-body">
        <p>Think of \\(K\\) as measuring the <em>type</em> of bending (bowl-like vs. saddle-like), and \\(H\\) as measuring the <em>amount</em> of bending (how far from flat). A flat plane has \\(K = 0\\) and \\(H = 0\\). A cylinder has \\(K = 0\\) but \\(H \\neq 0\\): it bends, but only in one direction, so it is "intrinsically flat." You can unroll a cylinder onto a table without stretching or tearing.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-curvature-heatmap"></div>
`,
            visualizations: [
                {
                    id: 'viz-curvature-heatmap',
                    title: 'Gaussian Curvature Heatmap',
                    description: 'A torus colored by Gaussian curvature \\(K\\). Red = \\(K > 0\\) (elliptic), blue = \\(K < 0\\) (hyperbolic), white = \\(K = 0\\) (parabolic). Drag the slider to reshape the torus and watch the curvature distribution change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 200, scale: 1
                        });

                        var R = 3.0;
                        var rr = 1.2;
                        var angleY = 0.5;
                        var angleX = 0.3;
                        var autoRotate = true;

                        VizEngine.createSlider(controls, 'Tube radius r', 0.3, 2.8, rr, 0.1, function(v) {
                            rr = v; if (!autoRotate) drawTorus();
                        });
                        VizEngine.createSlider(controls, 'Ring radius R', 1.5, 5.0, R, 0.1, function(v) {
                            R = v; if (!autoRotate) drawTorus();
                        });
                        VizEngine.createButton(controls, 'Toggle Rotation', function() {
                            autoRotate = !autoRotate;
                            if (autoRotate) viz.animate(function(t) { angleY = t * 0.0005; drawTorus(); });
                            else viz.stopAnimation();
                        });

                        function torusK(u, v) {
                            // K = cos(v) / (r(R + r cos v))
                            return Math.cos(v) / (rr * (R + rr * Math.cos(v)));
                        }

                        function curvatureColor(K, maxK) {
                            // Red for positive, blue for negative, white for zero
                            var t = Math.max(-1, Math.min(1, K / (maxK || 1)));
                            if (t > 0) {
                                var r = 255;
                                var g = Math.round(255 * (1 - t));
                                var b = Math.round(255 * (1 - t));
                                return 'rgb(' + r + ',' + g + ',' + b + ')';
                            } else {
                                var r2 = Math.round(255 * (1 + t));
                                var g2 = Math.round(255 * (1 + t));
                                var b2 = 255;
                                return 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';
                            }
                        }

                        function rotateY(x, y, z, a) {
                            var ca = Math.cos(a), sa = Math.sin(a);
                            return [x * ca + z * sa, y, -x * sa + z * ca];
                        }
                        function rotateX(x, y, z, a) {
                            var ca = Math.cos(a), sa = Math.sin(a);
                            return [x, y * ca - z * sa, y * sa + z * ca];
                        }

                        function project(x, y, z) {
                            var d = 15;
                            var scale = d / (d + z);
                            return [x * scale * 38 + viz.originX, -y * scale * 38 + viz.originY, z];
                        }

                        function drawTorus() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var nu = 60, nv = 30;
                            var maxK = 1 / (rr * (R - rr));

                            // Collect quads with depth for painter's algorithm
                            var quads = [];
                            for (var i = 0; i < nu; i++) {
                                for (var j = 0; j < nv; j++) {
                                    var u0 = (i / nu) * 2 * Math.PI;
                                    var u1 = ((i + 1) / nu) * 2 * Math.PI;
                                    var v0 = (j / nv) * 2 * Math.PI;
                                    var v1 = ((j + 1) / nv) * 2 * Math.PI;

                                    var uMid = (u0 + u1) / 2;
                                    var vMid = (v0 + v1) / 2;

                                    // 3D torus point
                                    function torusPoint(u, v) {
                                        var x = (R + rr * Math.cos(v)) * Math.cos(u);
                                        var y = (R + rr * Math.cos(v)) * Math.sin(u);
                                        var z = rr * Math.sin(v);
                                        var p = rotateY(x, y, z, angleY);
                                        p = rotateX(p[0], p[1], p[2], angleX);
                                        return p;
                                    }

                                    var p00 = torusPoint(u0, v0);
                                    var p10 = torusPoint(u1, v0);
                                    var p11 = torusPoint(u1, v1);
                                    var p01 = torusPoint(u0, v1);

                                    var pm = torusPoint(uMid, vMid);

                                    var K = torusK(uMid, vMid);
                                    var col = curvatureColor(K, maxK);

                                    // Normal for backface culling
                                    var ax = p10[0] - p00[0], ay = p10[1] - p00[1], az = p10[2] - p00[2];
                                    var bx = p01[0] - p00[0], by = p01[1] - p00[1], bz = p01[2] - p00[2];
                                    var nx = ay * bz - az * by;
                                    var ny = az * bx - ax * bz;
                                    var nz = ax * by - ay * bx;

                                    // View direction (towards -z)
                                    var dot = -nz;
                                    // Simple shading
                                    var shade = Math.max(0.3, Math.min(1, 0.5 + 0.5 * dot / Math.sqrt(nx*nx + ny*ny + nz*nz + 0.001)));

                                    quads.push({
                                        pts: [p00, p10, p11, p01],
                                        depth: pm[2],
                                        color: col,
                                        shade: shade,
                                        backface: dot < 0
                                    });
                                }
                            }

                            // Sort by depth (painter's algorithm)
                            quads.sort(function(a, b) { return a.depth - b.depth; });

                            for (var q = 0; q < quads.length; q++) {
                                var quad = quads[q];
                                if (quad.backface) continue;
                                var pts = quad.pts.map(function(p) { return project(p[0], p[1], p[2]); });

                                // Parse color and apply shading
                                var match = quad.color.match(/rgb\((\d+),(\d+),(\d+)\)/);
                                var cr = Math.round(parseInt(match[1]) * quad.shade);
                                var cg = Math.round(parseInt(match[2]) * quad.shade);
                                var cb = Math.round(parseInt(match[3]) * quad.shade);

                                ctx.fillStyle = 'rgb(' + cr + ',' + cg + ',' + cb + ')';
                                ctx.beginPath();
                                ctx.moveTo(pts[0][0], pts[0][1]);
                                ctx.lineTo(pts[1][0], pts[1][1]);
                                ctx.lineTo(pts[2][0], pts[2][1]);
                                ctx.lineTo(pts[3][0], pts[3][1]);
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Title and legend
                            viz.screenText('Torus: Gaussian Curvature K', viz.width / 2, 18, viz.colors.white, 15);
                            viz.screenText('R = ' + R.toFixed(1) + ', r = ' + rr.toFixed(1), viz.width / 2, 38, viz.colors.text, 12);

                            // Color legend
                            var legX = 20, legY = viz.height - 60, legW = 120, legH = 14;
                            ctx.font = '10px -apple-system,sans-serif';
                            for (var lx = 0; lx < legW; lx++) {
                                var lt = lx / legW;
                                var lk = (lt - 0.5) * 2;
                                ctx.fillStyle = curvatureColor(lk, 1);
                                ctx.fillRect(legX + lx, legY, 1, legH);
                            }
                            ctx.fillStyle = viz.colors.text;
                            ctx.textAlign = 'center';
                            ctx.fillText('K < 0', legX, legY + legH + 12);
                            ctx.fillText('K = 0', legX + legW / 2, legY + legH + 12);
                            ctx.fillText('K > 0', legX + legW, legY + legH + 12);
                        }

                        if (autoRotate) {
                            viz.animate(function(t) { angleY = t * 0.0005; drawTorus(); });
                        } else {
                            drawTorus();
                        }
                        return viz;
                    }
                }
            ],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Gaussian Curvature K
        // ================================================================
        {
            id: 'sec-gaussian',
            title: 'Gaussian Curvature K',
            content: `
<h2>Gaussian Curvature \\(K\\)</h2>

<div class="env-block definition">
    <div class="env-title">Definition 6.1 (Gaussian Curvature)</div>
    <div class="env-body">
        <p>Let \\(S\\) be a regular surface and \\(dN_p\\) the shape operator at \\(p \\in S\\). The <strong>Gaussian curvature</strong> is</p>
        \\[K(p) = \\det(dN_p) = \\kappa_1(p) \\cdot \\kappa_2(p),\\]
        <p>the product of the principal curvatures.</p>
    </div>
</div>

<p>The Gaussian curvature has a beautiful geometric interpretation. Consider a small region \\(R\\) on the surface with area \\(A(R)\\). The Gauss map \\(N\\) sends \\(R\\) to a region \\(N(R)\\) on the unit sphere \\(S^2\\). Then</p>

\\[K(p) = \\lim_{R \\to p} \\frac{\\text{Area}(N(R))}{\\text{Area}(R)}.\\]

<p>In other words, \\(K\\) measures how much the normal direction rotates per unit surface area. Where the surface curves sharply (like the pole of a sphere), the normal sweeps out a large solid angle, so \\(K\\) is large. Where the surface is nearly flat, \\(K\\) is near zero.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.1 (Sign of \\(K\\))</div>
    <div class="env-body">
        <p>Let \\(\\kappa_1, \\kappa_2\\) be the principal curvatures at \\(p\\).</p>
        <ul>
            <li>\\(K > 0\\): both principal curvatures have the <strong>same sign</strong>. The surface bends toward the same side in all tangent directions (locally convex or concave, like a sphere or elliptic paraboloid).</li>
            <li>\\(K < 0\\): the principal curvatures have <strong>opposite signs</strong>. The surface is saddle-shaped: it curves upward in one direction and downward in another (like a hyperbolic paraboloid).</li>
            <li>\\(K = 0\\): at least one principal curvature vanishes. The surface is "flat" in at least one direction (like a cylinder or a plane).</li>
        </ul>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Sphere of Radius \\(r\\)</div>
    <div class="env-body">
        <p>At every point of a sphere \\(S^2(r)\\), both principal curvatures equal \\(1/r\\) (with appropriate sign convention), so</p>
        \\[K = \\frac{1}{r} \\cdot \\frac{1}{r} = \\frac{1}{r^2}.\\]
        <p>The Gaussian curvature is constant and positive. A smaller sphere has larger curvature, matching intuition: small spheres are "more curved."</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Cylinder of Radius \\(r\\)</div>
    <div class="env-body">
        <p>A cylinder has \\(\\kappa_1 = 1/r\\) (around the circumference) and \\(\\kappa_2 = 0\\) (along the axis). Therefore \\(K = 0\\). Despite being "curved" as an object in \\(\\mathbb{R}^3\\), the cylinder is intrinsically flat: its geometry is the same as a flat strip of paper rolled up.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Gauss's Theorema Egregium (Preview)</div>
    <div class="env-body">
        <p>The most remarkable fact about \\(K\\) is that it depends only on the <strong>first fundamental form</strong> (the intrinsic metric), even though it is defined using the shape operator (which involves the ambient \\(\\mathbb{R}^3\\)). This is Gauss's Theorema Egregium ("remarkable theorem"), which we prove in Chapter 8. It means that \\(K\\) is a bending invariant: if you bend a surface without stretching, \\(K\\) does not change.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-saddle-vs-sphere"></div>
`,
            visualizations: [
                {
                    id: 'viz-saddle-vs-sphere',
                    title: 'Sphere (K > 0) vs Saddle (K < 0)',
                    description: 'Side-by-side comparison: a sphere (positive Gaussian curvature everywhere) and a hyperbolic paraboloid (negative Gaussian curvature). Both colored by \\(K\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var aY = 0.6;
                        var aX = 0.4;

                        function rot(x, y, z) {
                            var ca = Math.cos(aY), sa = Math.sin(aY);
                            var x2 = x * ca + z * sa, z2 = -x * sa + z * ca;
                            var cb = Math.cos(aX), sb = Math.sin(aX);
                            return [x2, y * cb - z2 * sb, y * sb + z2 * cb];
                        }
                        function proj(x, y, z, cx) {
                            var d = 12;
                            var s = d / (d + z) * 50;
                            return [cx + x * s, 190 - y * s];
                        }

                        function drawSurface(ctx, cx, surfFn, curvFn, label, maxK) {
                            var n = 30;
                            var quads = [];
                            for (var i = 0; i < n; i++) {
                                for (var j = 0; j < n; j++) {
                                    var u0 = -2 + 4 * i / n, u1 = -2 + 4 * (i + 1) / n;
                                    var v0 = -2 + 4 * j / n, v1 = -2 + 4 * (j + 1) / n;
                                    var uM = (u0 + u1) / 2, vM = (v0 + v1) / 2;

                                    var p00 = surfFn(u0, v0), p10 = surfFn(u1, v0);
                                    var p01 = surfFn(u0, v1), p11 = surfFn(u1, v1);
                                    if (!p00 || !p10 || !p01 || !p11) continue;

                                    var r00 = rot(p00[0], p00[1], p00[2]);
                                    var r10 = rot(p10[0], p10[1], p10[2]);
                                    var r01 = rot(p01[0], p01[1], p01[2]);
                                    var r11 = rot(p11[0], p11[1], p11[2]);
                                    var rM = [(r00[0]+r10[0]+r01[0]+r11[0])/4, (r00[1]+r10[1]+r01[1]+r11[1])/4, (r00[2]+r10[2]+r01[2]+r11[2])/4];

                                    var K = curvFn(uM, vM);
                                    var t = Math.max(-1, Math.min(1, K / maxK));

                                    // Normal for shading
                                    var ax = r10[0]-r00[0], ay = r10[1]-r00[1], az = r10[2]-r00[2];
                                    var bx = r01[0]-r00[0], by = r01[1]-r00[1], bz = r01[2]-r00[2];
                                    var nz = ax * by - ay * bx;
                                    var nl = Math.sqrt((ay*bz-az*by)**2 + (az*bx-ax*bz)**2 + nz**2) + 0.001;
                                    var shade = Math.max(0.35, 0.5 + 0.5 * Math.abs(nz) / nl);

                                    var cr, cg, cb;
                                    if (t > 0) {
                                        cr = Math.round(255 * shade);
                                        cg = Math.round(255 * (1 - t) * shade);
                                        cb = Math.round(255 * (1 - t) * shade);
                                    } else {
                                        cr = Math.round(255 * (1 + t) * shade);
                                        cg = Math.round(255 * (1 + t) * shade);
                                        cb = Math.round(255 * shade);
                                    }

                                    quads.push({
                                        pts: [
                                            proj(r00[0], r00[1], r00[2], cx),
                                            proj(r10[0], r10[1], r10[2], cx),
                                            proj(r11[0], r11[1], r11[2], cx),
                                            proj(r01[0], r01[1], r01[2], cx)
                                        ],
                                        depth: rM[2],
                                        col: 'rgb(' + cr + ',' + cg + ',' + cb + ')'
                                    });
                                }
                            }
                            quads.sort(function(a, b) { return a.depth - b.depth; });
                            for (var q = 0; q < quads.length; q++) {
                                ctx.fillStyle = quads[q].col;
                                ctx.beginPath();
                                ctx.moveTo(quads[q].pts[0][0], quads[q].pts[0][1]);
                                ctx.lineTo(quads[q].pts[1][0], quads[q].pts[1][1]);
                                ctx.lineTo(quads[q].pts[2][0], quads[q].pts[2][1]);
                                ctx.lineTo(quads[q].pts[3][0], quads[q].pts[3][1]);
                                ctx.closePath();
                                ctx.fill();
                            }
                            viz.screenText(label, cx, 350, viz.colors.white, 13);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Sphere (upper hemisphere)
                            function spherePt(u, v) {
                                var phi = u * Math.PI / 4, th = v * Math.PI / 4;
                                var r2 = phi * phi + th * th;
                                if (r2 > 3.5) return null;
                                var z = Math.sqrt(Math.max(0, 4 - r2));
                                return [phi, th, z - 2];
                            }
                            function sphereK() { return 0.25; }

                            // Saddle z = (x^2 - y^2)/4
                            function saddlePt(u, v) {
                                return [u, v, (u * u - v * v) / 4];
                            }
                            function saddleK(u, v) {
                                var denom = (1 + u*u/4 + v*v/4);
                                return -1 / (4 * denom * denom);
                            }

                            drawSurface(ctx, 150, spherePt, sphereK, 'Sphere: K = 1/r\u00B2 > 0', 0.3);
                            drawSurface(ctx, 410, saddlePt, saddleK, 'Saddle: K < 0', 0.3);

                            viz.screenText('Positive vs. Negative Gaussian Curvature', viz.width / 2, 20, viz.colors.white, 14);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the Gaussian curvature at every point of the sphere \\(x^2 + y^2 + z^2 = R^2\\). What happens as \\(R \\to \\infty\\)?',
                    hint: 'Both principal curvatures are \\(1/R\\). What is their product?',
                    solution: 'Both principal curvatures are \\(\\kappa_1 = \\kappa_2 = 1/R\\), so \\(K = 1/R^2\\). As \\(R \\to \\infty\\), \\(K \\to 0\\): a very large sphere is nearly flat, confirming intuition.'
                },
                {
                    question: 'Show that a cylinder of radius \\(r\\) has \\(K = 0\\) everywhere, even though it is clearly "curved" in \\(\\mathbb{R}^3\\).',
                    hint: 'One principal curvature is along the circumference, the other along the axis. What is the curvature along the axis?',
                    solution: 'Along the circumference, \\(\\kappa_1 = 1/r\\). Along the axis (a straight line), \\(\\kappa_2 = 0\\). Therefore \\(K = \\kappa_1 \\kappa_2 = 0\\). The cylinder bends in only one direction; the Gaussian curvature detects only "two-directional" bending.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Mean Curvature H
        // ================================================================
        {
            id: 'sec-mean',
            title: 'Mean Curvature H',
            content: `
<h2>Mean Curvature \\(H\\)</h2>

<div class="env-block definition">
    <div class="env-title">Definition 6.2 (Mean Curvature)</div>
    <div class="env-body">
        <p>The <strong>mean curvature</strong> at a point \\(p\\) of a regular surface is</p>
        \\[H(p) = \\frac{1}{2}\\operatorname{tr}(dN_p) = \\frac{\\kappa_1(p) + \\kappa_2(p)}{2},\\]
        <p>the average of the principal curvatures.</p>
    </div>
</div>

<p>Where \\(K\\) measures how area is distorted by the Gauss map, \\(H\\) measures how the surface bends <em>on average</em>. More precisely, \\(H\\) arises as the first variation of the area functional: if you deform a surface in the normal direction by a small amount \\(\\varepsilon \\phi(p)\\), the rate of change of area is</p>

\\[\\frac{d}{d\\varepsilon}\\Big|_{\\varepsilon=0} \\text{Area}(S_\\varepsilon) = -2 \\int_S H \\, \\phi \\, dA.\\]

<p>This means: <strong>\\(H = 0\\) everywhere if and only if the surface is a critical point of the area functional</strong>, i.e., a <em>minimal surface</em>. Soap films (which minimize area under boundary constraints) have \\(H = 0\\).</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.2 (Mean Curvature and Average Normal Curvature)</div>
    <div class="env-body">
        <p>The mean curvature \\(H(p)\\) equals the average of the normal curvature \\(\\kappa_n(\\theta)\\) over all tangent directions:</p>
        \\[H(p) = \\frac{1}{2\\pi} \\int_0^{2\\pi} \\kappa_n(\\theta) \\, d\\theta.\\]
        <p>This follows from Euler's formula \\(\\kappa_n(\\theta) = \\kappa_1 \\cos^2\\theta + \\kappa_2 \\sin^2\\theta\\) and the fact that \\(\\frac{1}{2\\pi}\\int_0^{2\\pi} \\cos^2\\theta \\, d\\theta = \\frac{1}{2\\pi}\\int_0^{2\\pi} \\sin^2\\theta \\, d\\theta = \\frac{1}{2}\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Sphere vs. Minimal Surface</div>
    <div class="env-body">
        <p>For a sphere of radius \\(r\\): \\(H = \\frac{1}{2}(1/r + 1/r) = 1/r\\). The sphere bends equally in all directions.</p>
        <p>For a catenoid (the soap film between two coaxial rings): \\(\\kappa_1 = -\\kappa_2\\) at each point, so \\(H = 0\\). The upward curvature in one principal direction exactly cancels the downward curvature in the other.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Extrinsic Nature of \\(H\\)</div>
    <div class="env-body">
        <p>Unlike \\(K\\), the mean curvature \\(H\\) is <strong>not</strong> a bending invariant. A flat sheet of paper has \\(H = 0\\), but if you bend it into a cylinder of radius \\(r\\), the mean curvature becomes \\(H = 1/(2r) \\neq 0\\). The bending changed \\(H\\) but preserved \\(K = 0\\). This is the fundamental distinction between intrinsic and extrinsic geometry.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-mean-curvature-heatmap"></div>
`,
            visualizations: [
                {
                    id: 'viz-mean-curvature-heatmap',
                    title: 'Mean Curvature Heatmap',
                    description: 'A torus colored by mean curvature \\(H\\). Orange/red = large \\(|H|\\) (strongly curved), dark blue = small \\(|H|\\) (nearly flat). Compare with the Gaussian curvature heatmap in Section 1.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 190, scale: 1
                        });

                        var R = 3.0, rr = 1.2;
                        var angleY = 0.5, angleX = 0.3;

                        VizEngine.createSlider(controls, 'r', 0.3, 2.8, rr, 0.1, function(v) { rr = v; drawH(); });
                        VizEngine.createSlider(controls, 'R', 1.5, 5.0, R, 0.1, function(v) { R = v; drawH(); });

                        function torusH(u, v) {
                            // H = -(R + 2r cos v) / (2r(R + r cos v))
                            return -(R + 2 * rr * Math.cos(v)) / (2 * rr * (R + rr * Math.cos(v)));
                        }

                        function heatColor(val, maxVal) {
                            var t = Math.abs(val) / (maxVal || 1);
                            t = Math.min(1, t);
                            // Dark blue (low) to orange/red (high)
                            var r = Math.round(255 * Math.min(1, t * 2));
                            var g = Math.round(255 * Math.max(0, t - 0.5) * 1.5);
                            var b = Math.round(255 * (1 - t) * 0.8);
                            return 'rgb(' + r + ',' + g + ',' + b + ')';
                        }

                        function rotY(x, y, z) {
                            var c = Math.cos(angleY), s = Math.sin(angleY);
                            return [x*c+z*s, y, -x*s+z*c];
                        }
                        function rotX(x, y, z) {
                            var c = Math.cos(angleX), s = Math.sin(angleX);
                            return [x, y*c-z*s, y*s+z*c];
                        }
                        function proj(x, y, z) {
                            var d = 15, s = d / (d+z) * 38;
                            return [x*s + viz.originX, -y*s + viz.originY];
                        }

                        function drawH() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var nu = 55, nv = 28;
                            var maxH = Math.abs(torusH(0, 0)) * 1.3;

                            var quads = [];
                            for (var i = 0; i < nu; i++) {
                                for (var j = 0; j < nv; j++) {
                                    var u0 = (i/nu)*2*Math.PI, u1 = ((i+1)/nu)*2*Math.PI;
                                    var v0 = (j/nv)*2*Math.PI, v1 = ((j+1)/nv)*2*Math.PI;
                                    var vM = (v0+v1)/2;

                                    function tp(u, v) {
                                        var x = (R+rr*Math.cos(v))*Math.cos(u);
                                        var y = (R+rr*Math.cos(v))*Math.sin(u);
                                        var z = rr*Math.sin(v);
                                        var p = rotY(x, y, z);
                                        return rotX(p[0], p[1], p[2]);
                                    }

                                    var p00=tp(u0,v0), p10=tp(u1,v0), p01=tp(u0,v1), p11=tp(u1,v1);
                                    var pm = [(p00[0]+p10[0]+p01[0]+p11[0])/4, (p00[1]+p10[1]+p01[1]+p11[1])/4, (p00[2]+p10[2]+p01[2]+p11[2])/4];

                                    var ax=p10[0]-p00[0], ay=p10[1]-p00[1], az=p10[2]-p00[2];
                                    var bx=p01[0]-p00[0], by=p01[1]-p00[1], bz=p01[2]-p00[2];
                                    var nz = ax*by - ay*bx;
                                    if (-nz < 0) continue;

                                    var nl = Math.sqrt((ay*bz-az*by)**2 + (az*bx-ax*bz)**2 + nz**2) + 0.001;
                                    var shade = Math.max(0.35, 0.5 + 0.5*Math.abs(nz)/nl);

                                    var H = torusH(0, vM);
                                    var col = heatColor(H, maxH);
                                    var m = col.match(/rgb\((\d+),(\d+),(\d+)\)/);
                                    var cr = Math.round(parseInt(m[1])*shade);
                                    var cg = Math.round(parseInt(m[2])*shade);
                                    var cb = Math.round(parseInt(m[3])*shade);

                                    quads.push({
                                        pts: [proj(p00[0],p00[1],p00[2]), proj(p10[0],p10[1],p10[2]),
                                              proj(p11[0],p11[1],p11[2]), proj(p01[0],p01[1],p01[2])],
                                        depth: pm[2],
                                        col: 'rgb('+cr+','+cg+','+cb+')'
                                    });
                                }
                            }
                            quads.sort(function(a,b) { return a.depth - b.depth; });
                            for (var q = 0; q < quads.length; q++) {
                                ctx.fillStyle = quads[q].col;
                                ctx.beginPath();
                                ctx.moveTo(quads[q].pts[0][0], quads[q].pts[0][1]);
                                ctx.lineTo(quads[q].pts[1][0], quads[q].pts[1][1]);
                                ctx.lineTo(quads[q].pts[2][0], quads[q].pts[2][1]);
                                ctx.lineTo(quads[q].pts[3][0], quads[q].pts[3][1]);
                                ctx.closePath();
                                ctx.fill();
                            }

                            viz.screenText('Torus: Mean Curvature |H|', viz.width/2, 18, viz.colors.white, 15);

                            // Legend
                            var legX = 20, legY = viz.height - 50, legW = 120, legH = 12;
                            for (var lx = 0; lx < legW; lx++) {
                                ctx.fillStyle = heatColor(lx / legW * maxH, maxH);
                                ctx.fillRect(legX+lx, legY, 1, legH);
                            }
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('|H| small', legX, legY+legH+12);
                            ctx.fillText('|H| large', legX+legW, legY+legH+12);
                        }

                        drawH();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(H\\) at every point of a sphere of radius \\(R\\). Is \\(H\\) constant?',
                    hint: 'Both principal curvatures equal \\(1/R\\).',
                    solution: '\\(H = \\frac{1}{2}(1/R + 1/R) = 1/R\\). Yes, \\(H\\) is constant on a sphere, reflecting its perfect symmetry. In fact, a compact surface with constant \\(H\\) must be a sphere (Alexandrov theorem).'
                },
                {
                    question: 'A minimal surface satisfies \\(H = 0\\). Show that this means \\(\\kappa_1 = -\\kappa_2\\) at every point, and deduce that \\(K \\le 0\\) on a minimal surface.',
                    hint: 'If \\(\\kappa_1 + \\kappa_2 = 0\\), what is \\(\\kappa_1 \\kappa_2\\)?',
                    solution: '\\(H = 0\\) means \\(\\kappa_1 + \\kappa_2 = 0\\), so \\(\\kappa_2 = -\\kappa_1\\). Then \\(K = \\kappa_1 \\kappa_2 = -\\kappa_1^2 \\le 0\\). Equality holds only when \\(\\kappa_1 = \\kappa_2 = 0\\), i.e., at a flat point. Minimal surfaces are either flat or have strictly negative Gaussian curvature.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Classification by K
        // ================================================================
        {
            id: 'sec-classification',
            title: 'Classification by K',
            content: `
<h2>Classification of Points by Gaussian Curvature</h2>

<p>The sign of \\(K\\) at a point classifies the local shape of the surface into one of three fundamental types. This classification is the most basic tool in the differential geometry of surfaces.</p>

<div class="env-block definition">
    <div class="env-title">Definition 6.3 (Point Classification)</div>
    <div class="env-body">
        <p>A point \\(p\\) on a regular surface is called:</p>
        <ul>
            <li><strong>Elliptic</strong> if \\(K(p) > 0\\). The principal curvatures have the same sign. Locally, the surface lies entirely on one side of its tangent plane (like the top of a hill or the bottom of a bowl).</li>
            <li><strong>Hyperbolic</strong> if \\(K(p) < 0\\). The principal curvatures have opposite signs. The surface crosses its tangent plane along two curves (like a mountain pass or saddle point).</li>
            <li><strong>Parabolic</strong> if \\(K(p) = 0\\) and at least one \\(\\kappa_i \\neq 0\\). Exactly one principal curvature vanishes. The surface touches its tangent plane along a curve (like a cylinder).</li>
            <li><strong>Planar</strong> (or flat) if \\(K(p) = 0\\) and \\(\\kappa_1 = \\kappa_2 = 0\\). The shape operator vanishes, and the surface is locally indistinguishable from a plane (up to second order).</li>
        </ul>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.3 (Tangent Plane Contact)</div>
    <div class="env-body">
        <p>Let \\(p\\) be a point on a surface \\(S\\) with tangent plane \\(T_pS\\).</p>
        <ul>
            <li>If \\(K(p) > 0\\), then \\(S\\) and \\(T_pS\\) intersect only at \\(p\\) in a neighborhood of \\(p\\). The surface is locally convex.</li>
            <li>If \\(K(p) < 0\\), then \\(S\\) and \\(T_pS\\) intersect along two curves crossing at \\(p\\), dividing the neighborhood into four sectors alternately above and below the tangent plane.</li>
        </ul>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Torus</div>
    <div class="env-body">
        <p>The torus \\((R + r\\cos v)\\cos u, (R + r\\cos v)\\sin u, r\\sin v)\\) has all three types:</p>
        <ul>
            <li><strong>Elliptic</strong> (\\(K > 0\\)): the outer ring (\\(\\cos v > 0\\)), where the surface faces "outward" like a sphere.</li>
            <li><strong>Hyperbolic</strong> (\\(K < 0\\)): the inner ring (\\(\\cos v < 0\\)), where the surface is saddle-shaped.</li>
            <li><strong>Parabolic</strong> (\\(K = 0\\)): the top and bottom circles (\\(v = \\pi/2\\) and \\(v = 3\\pi/2\\)), the boundaries between the two regions.</li>
        </ul>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-classification-regions"></div>
`,
            visualizations: [
                {
                    id: 'viz-classification-regions',
                    title: 'Elliptic / Parabolic / Hyperbolic Regions on a Torus',
                    description: 'The torus partitioned into regions by the sign of \\(K\\). Green = elliptic (\\(K > 0\\), outer ring), orange = hyperbolic (\\(K < 0\\), inner ring), white lines = parabolic circles (\\(K = 0\\)).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 195, scale: 1
                        });

                        var R = 3.0, rr = 1.3;
                        var aY = 0.6, aX = 0.35;

                        function rotYX(x, y, z) {
                            var c1=Math.cos(aY), s1=Math.sin(aY);
                            var x2=x*c1+z*s1, z2=-x*s1+z*c1;
                            var c2=Math.cos(aX), s2=Math.sin(aX);
                            return [x2, y*c2-z2*s2, y*s2+z2*c2];
                        }
                        function proj(x,y,z) {
                            var d=15, s=d/(d+z)*38;
                            return [x*s+viz.originX, -y*s+viz.originY];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var nu=55, nv=28;

                            var quads = [];
                            for (var i=0; i<nu; i++) {
                                for (var j=0; j<nv; j++) {
                                    var u0=(i/nu)*2*Math.PI, u1=((i+1)/nu)*2*Math.PI;
                                    var v0=(j/nv)*2*Math.PI, v1=((j+1)/nv)*2*Math.PI;
                                    var vM=(v0+v1)/2;

                                    function tp(u,v) {
                                        var x=(R+rr*Math.cos(v))*Math.cos(u);
                                        var y2=(R+rr*Math.cos(v))*Math.sin(u);
                                        var z=rr*Math.sin(v);
                                        return rotYX(x,y2,z);
                                    }

                                    var p00=tp(u0,v0),p10=tp(u1,v0),p01=tp(u0,v1),p11=tp(u1,v1);
                                    var pm=[(p00[0]+p10[0]+p01[0]+p11[0])/4,(p00[1]+p10[1]+p01[1]+p11[1])/4,(p00[2]+p10[2]+p01[2]+p11[2])/4];

                                    var ax=p10[0]-p00[0],ay=p10[1]-p00[1],az=p10[2]-p00[2];
                                    var bx=p01[0]-p00[0],by=p01[1]-p00[1],bz=p01[2]-p00[2];
                                    var nz=ax*by-ay*bx;
                                    if(-nz<0) continue;
                                    var nl=Math.sqrt((ay*bz-az*by)**2+(az*bx-ax*bz)**2+nz**2)+0.001;
                                    var shade=Math.max(0.35, 0.5+0.5*Math.abs(nz)/nl);

                                    // Classification by cos(vM)
                                    var cv = Math.cos(vM);
                                    var cr, cg, cb;
                                    if (cv > 0.05) {
                                        // Elliptic: green
                                        cr=Math.round(60*shade); cg=Math.round(200*shade); cb=Math.round(80*shade);
                                    } else if (cv < -0.05) {
                                        // Hyperbolic: orange
                                        cr=Math.round(230*shade); cg=Math.round(140*shade); cb=Math.round(50*shade);
                                    } else {
                                        // Parabolic: white
                                        cr=Math.round(240*shade); cg=Math.round(240*shade); cb=Math.round(240*shade);
                                    }

                                    quads.push({
                                        pts:[proj(p00[0],p00[1],p00[2]),proj(p10[0],p10[1],p10[2]),
                                             proj(p11[0],p11[1],p11[2]),proj(p01[0],p01[1],p01[2])],
                                        depth:pm[2],
                                        col:'rgb('+cr+','+cg+','+cb+')'
                                    });
                                }
                            }
                            quads.sort(function(a,b){return a.depth-b.depth;});
                            for (var q=0; q<quads.length; q++) {
                                ctx.fillStyle=quads[q].col;
                                ctx.beginPath();
                                ctx.moveTo(quads[q].pts[0][0],quads[q].pts[0][1]);
                                ctx.lineTo(quads[q].pts[1][0],quads[q].pts[1][1]);
                                ctx.lineTo(quads[q].pts[2][0],quads[q].pts[2][1]);
                                ctx.lineTo(quads[q].pts[3][0],quads[q].pts[3][1]);
                                ctx.closePath();
                                ctx.fill();
                            }

                            viz.screenText('Classification of Points on a Torus', viz.width/2, 18, viz.colors.white, 15);
                            // Legend
                            var lx=30, ly=viz.height-55;
                            ctx.fillStyle='rgb(60,200,80)'; ctx.fillRect(lx,ly,14,14);
                            ctx.fillStyle=viz.colors.text; ctx.font='11px -apple-system,sans-serif'; ctx.textAlign='left';
                            ctx.fillText('Elliptic (K>0)',lx+20,ly+11);
                            ctx.fillStyle='rgb(230,140,50)'; ctx.fillRect(lx+140,ly,14,14);
                            ctx.fillStyle=viz.colors.text;
                            ctx.fillText('Hyperbolic (K<0)',lx+160,ly+11);
                            ctx.fillStyle='rgb(240,240,240)'; ctx.fillRect(lx+310,ly,14,14);
                            ctx.fillStyle=viz.colors.text;
                            ctx.fillText('Parabolic (K=0)',lx+330,ly+11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Consider the monkey saddle \\(z = x^3 - 3xy^2\\). Classify the origin: is it elliptic, hyperbolic, parabolic, or planar?',
                    hint: 'Compute the second fundamental form at the origin. What is \\(K(0,0)\\)?',
                    solution: 'At the origin, \\(z_{xx} = 6x|_0 = 0\\), \\(z_{xy} = -6y|_0 = 0\\), \\(z_{yy} = -6x|_0 = 0\\). The shape operator is the zero matrix, so \\(K = 0\\) and both \\(\\kappa_i = 0\\). The origin is a <strong>planar</strong> (flat) point. Despite the complex shape of the surface globally, at the origin all curvature information vanishes to second order.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Computation
        // ================================================================
        {
            id: 'sec-formulas',
            title: 'Computation',
            content: `
<h2>Computing \\(K\\) and \\(H\\) from the Fundamental Forms</h2>

<p>In practice, we rarely compute the principal curvatures individually. Instead, we work with the coefficients of the first and second fundamental forms, which arise naturally from a parametrization \\(\\mathbf{x}(u,v)\\).</p>

<h3>Setup</h3>
<p>Recall from Chapters 4 and 5:</p>
<ul>
    <li>First fundamental form coefficients: \\(E = \\langle \\mathbf{x}_u, \\mathbf{x}_u \\rangle\\), \\(F = \\langle \\mathbf{x}_u, \\mathbf{x}_v \\rangle\\), \\(G = \\langle \\mathbf{x}_v, \\mathbf{x}_v \\rangle\\).</li>
    <li>Second fundamental form coefficients: \\(e = \\langle \\mathbf{x}_{uu}, N \\rangle\\), \\(f = \\langle \\mathbf{x}_{uv}, N \\rangle\\), \\(g = \\langle \\mathbf{x}_{vv}, N \\rangle\\).</li>
</ul>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.4 (Formulas for \\(K\\) and \\(H\\))</div>
    <div class="env-body">
        <p>In terms of the fundamental form coefficients:</p>
        \\[K = \\frac{eg - f^2}{EG - F^2}\\]
        \\[H = \\frac{eG - 2fF + gE}{2(EG - F^2)}\\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>The shape operator \\(S\\) in the basis \\(\\{\\mathbf{x}_u, \\mathbf{x}_v\\}\\) is represented by the matrix \\(\\mathrm{I}^{-1} \\mathrm{I\\!I}\\), where \\(\\mathrm{I} = \\begin{pmatrix} E & F \\\\ F & G \\end{pmatrix}\\) and \\(\\mathrm{I\\!I} = \\begin{pmatrix} e & f \\\\ f & g \\end{pmatrix}\\). Then:</p>
        \\[K = \\det(S) = \\det(\\mathrm{I}^{-1} \\mathrm{I\\!I}) = \\frac{\\det(\\mathrm{I\\!I})}{\\det(\\mathrm{I})} = \\frac{eg - f^2}{EG - F^2}\\]
        \\[H = \\frac{1}{2}\\operatorname{tr}(S) = \\frac{1}{2}\\operatorname{tr}(\\mathrm{I}^{-1} \\mathrm{I\\!I}) = \\frac{eG - 2fF + gE}{2(EG - F^2)}.\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Graph \\(z = f(x,y)\\)</div>
    <div class="env-body">
        <p>For a surface given as a graph \\(\\mathbf{x}(u,v) = (u, v, f(u,v))\\):</p>
        \\[E = 1 + f_u^2, \\quad F = f_u f_v, \\quad G = 1 + f_v^2\\]
        \\[e = \\frac{f_{uu}}{\\sqrt{1 + f_u^2 + f_v^2}}, \\quad f = \\frac{f_{uv}}{\\sqrt{1 + f_u^2 + f_v^2}}, \\quad g = \\frac{f_{vv}}{\\sqrt{1 + f_u^2 + f_v^2}}\\]
        <p>So the Gaussian curvature of a graph is:</p>
        \\[K = \\frac{f_{uu} f_{vv} - f_{uv}^2}{(1 + f_u^2 + f_v^2)^2}\\]
        <p>Notice: the numerator is the <strong>Hessian determinant</strong> of \\(f\\). The sign of \\(K\\) matches the sign of \\(\\det(\\text{Hess } f)\\), which is exactly the second-derivative test from multivariable calculus.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Orthogonal Parametrization (\\(F = 0\\))</div>
    <div class="env-body">
        <p>When \\(F = 0\\) (the coordinate curves are orthogonal, which is common in many standard parametrizations), the formulas simplify to:</p>
        \\[K = \\frac{eg - f^2}{EG}, \\qquad H = \\frac{eG + gE}{2EG} = \\frac{1}{2}\\left(\\frac{e}{E} + \\frac{g}{G}\\right).\\]
        <p>If additionally \\(f = 0\\) (principal curvature coordinates), then \\(\\kappa_1 = e/E\\) and \\(\\kappa_2 = g/G\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-principal-curvatures"></div>
`,
            visualizations: [
                {
                    id: 'viz-principal-curvatures',
                    title: 'Principal Curvatures, K, and H at a Point',
                    description: 'Drag the point on the surface \\(z = x^2 - y^2\\) (saddle). The display shows \\(\\kappa_1, \\kappa_2\\) and computes \\(K = \\kappa_1 \\kappa_2\\) and \\(H = (\\kappa_1 + \\kappa_2)/2\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 250, scale: 55
                        });

                        var ptU = 0.8, ptV = 0.5;
                        var drag = viz.addDraggable('pt', ptU, ptV, viz.colors.teal, 8, function(x, y) {
                            ptU = Math.max(-2.5, Math.min(2.5, x));
                            ptV = Math.max(-2, Math.min(2, y));
                            drag.x = ptU; drag.y = ptV;
                            draw();
                        });

                        // Saddle: z = x^2 - y^2, but we show the 2D top-view
                        function saddleK(x, y) {
                            var denom = (1 + 4*x*x + 4*y*y);
                            return -4 / (denom * denom);
                        }
                        function saddleH(x, y) {
                            var p = 1 + 4*x*x + 4*y*y;
                            var sp = Math.sqrt(p);
                            return 2*(y*y - x*x) / (p * sp);
                        }
                        function kappa1(x, y) {
                            var H = saddleH(x, y);
                            var K = saddleK(x, y);
                            var disc = Math.max(0, H*H - K);
                            return H + Math.sqrt(disc);
                        }
                        function kappa2(x, y) {
                            var H = saddleH(x, y);
                            var K = saddleK(x, y);
                            var disc = Math.max(0, H*H - K);
                            return H - Math.sqrt(disc);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Draw curvature heatmap as colored grid
                            var ctx = viz.ctx;
                            var step = 0.15;
                            for (var gx = -3; gx < 3; gx += step) {
                                for (var gy = -2.5; gy < 2.5; gy += step) {
                                    var K = saddleK(gx, gy);
                                    var maxK = 4;
                                    var t = Math.max(-1, Math.min(1, K / maxK * 15));
                                    var cr, cg, cb;
                                    if (t > 0) { cr=255; cg=Math.round(255*(1-t)); cb=Math.round(255*(1-t)); }
                                    else { cr=Math.round(255*(1+t)); cg=Math.round(255*(1+t)); cb=255; }
                                    var p1 = viz.toScreen(gx, gy);
                                    var p2 = viz.toScreen(gx+step, gy+step);
                                    ctx.fillStyle = 'rgba('+cr+','+cg+','+cb+',0.3)';
                                    ctx.fillRect(p1[0], p2[1], p2[0]-p1[0], p1[1]-p2[1]);
                                }
                            }

                            // Level curves of z = x^2 - y^2
                            ctx.strokeStyle = viz.colors.text + '44';
                            ctx.lineWidth = 0.8;
                            for (var c = -4; c <= 4; c += 0.5) {
                                if (c === 0) continue;
                                ctx.beginPath();
                                var started = false;
                                for (var t2 = -3; t2 <= 3; t2 += 0.02) {
                                    var yy;
                                    if (c > 0) yy = Math.sqrt(Math.max(0, t2*t2 - c));
                                    else yy = Math.sqrt(t2*t2 - c);
                                    if (!isFinite(yy)) { started = false; continue; }
                                    if (c > 0 && t2*t2 < c) { started = false; continue; }
                                    var sp = viz.toScreen(t2, yy);
                                    if (!started) { ctx.moveTo(sp[0], sp[1]); started = true; }
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                                ctx.beginPath(); started = false;
                                for (var t3 = -3; t3 <= 3; t3 += 0.02) {
                                    var yy2;
                                    if (c > 0) yy2 = -Math.sqrt(Math.max(0, t3*t3 - c));
                                    else yy2 = -Math.sqrt(t3*t3 - c);
                                    if (!isFinite(yy2)) { started = false; continue; }
                                    if (c > 0 && t3*t3 < c) { started = false; continue; }
                                    var sp2 = viz.toScreen(t3, yy2);
                                    if (!started) { ctx.moveTo(sp2[0], sp2[1]); started = true; }
                                    else ctx.lineTo(sp2[0], sp2[1]);
                                }
                                ctx.stroke();
                            }

                            // Draggable point
                            viz.drawDraggables();

                            // Compute values at the dragged point
                            var Kval = saddleK(ptU, ptV);
                            var Hval = saddleH(ptU, ptV);
                            var k1 = kappa1(ptU, ptV);
                            var k2 = kappa2(ptU, ptV);

                            // Info panel
                            var px = viz.width - 10, py = 18;
                            ctx.textAlign = 'right';
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Surface: z = x\u00B2 \u2212 y\u00B2', px, py);
                            py += 22;
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Point: (' + ptU.toFixed(2) + ', ' + ptV.toFixed(2) + ')', px, py);
                            py += 20;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('\u03BA\u2081 = ' + k1.toFixed(4), px, py);
                            py += 18;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('\u03BA\u2082 = ' + k2.toFixed(4), px, py);
                            py += 22;
                            ctx.fillStyle = Kval > 0 ? viz.colors.red : (Kval < -0.001 ? viz.colors.blue : viz.colors.white);
                            ctx.fillText('K = \u03BA\u2081\u03BA\u2082 = ' + Kval.toFixed(4), px, py);
                            py += 18;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('H = (\u03BA\u2081+\u03BA\u2082)/2 = ' + Hval.toFixed(4), px, py);

                            viz.screenText('Top view of z = x\u00B2 \u2212 y\u00B2 (colored by K)', viz.width / 2, viz.height - 10, viz.colors.text, 11);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For the paraboloid \\(z = x^2 + y^2\\), compute \\(K\\) and \\(H\\) at the origin using the graph formula.',
                    hint: 'At the origin, \\(f_x = f_y = 0\\), \\(f_{xx} = f_{yy} = 2\\), \\(f_{xy} = 0\\).',
                    solution: 'At the origin: \\(K = \\frac{f_{xx}f_{yy} - f_{xy}^2}{(1 + f_x^2 + f_y^2)^2} = \\frac{2 \\cdot 2 - 0}{1^2} = 4\\). For \\(H\\): \\(\\kappa_1 = \\kappa_2 = 2\\) at the origin (both normal curvatures in principal directions), so \\(H = 2\\). The origin is an elliptic point.'
                },
                {
                    question: 'For the saddle surface \\(z = xy\\), compute \\(K\\) at a general point \\((x,y)\\).',
                    hint: '\\(f_{xx} = 0, f_{xy} = 1, f_{yy} = 0\\). Use the graph formula.',
                    solution: '\\(K = \\frac{0 \\cdot 0 - 1^2}{(1 + x^2 + y^2)^2} = \\frac{-1}{(1 + x^2 + y^2)^2}\\). The curvature is always negative (the surface is hyperbolic everywhere) and approaches zero far from the origin as the surface flattens out.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Surfaces of Revolution
        // ================================================================
        {
            id: 'sec-surfaces-of-revolution',
            title: 'Surfaces of Revolution',
            content: `
<h2>Curvature of Surfaces of Revolution</h2>

<p>Surfaces of revolution are among the most important examples in differential geometry: they are simple enough to compute explicitly, yet rich enough to exhibit all types of curvature behavior.</p>

<div class="env-block definition">
    <div class="env-title">Setup</div>
    <div class="env-body">
        <p>A surface of revolution is generated by rotating a <strong>profile curve</strong> \\(\\alpha(v) = (\\varphi(v), 0, \\psi(v))\\) about the \\(z\\)-axis. The parametrization is</p>
        \\[\\mathbf{x}(u,v) = (\\varphi(v)\\cos u, \\; \\varphi(v)\\sin u, \\; \\psi(v)),\\]
        <p>where \\(u \\in [0, 2\\pi)\\) is the angle of rotation and \\(v\\) parameterizes the profile. We assume \\(\\varphi(v) > 0\\) (the curve does not cross the axis) and \\(\\varphi'^2 + \\psi'^2 = 1\\) (arc-length parametrization of the profile).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.5 (Curvatures of a Surface of Revolution)</div>
    <div class="env-body">
        <p>With the arc-length-parametrized profile, the fundamental form coefficients are:</p>
        \\[E = \\varphi^2, \\quad F = 0, \\quad G = 1\\]
        \\[e = -\\varphi(\\varphi'\\psi'' - \\varphi''\\psi'), \\quad f = 0, \\quad g = \\varphi''\\psi' - \\varphi'\\psi''\\]
        <p>Wait: since \\(F = f = 0\\), the \\(u\\) and \\(v\\) curves are lines of curvature! The principal curvatures are:</p>
        \\[\\kappa_1 = \\frac{e}{E} = \\frac{-(\\varphi'\\psi'' - \\varphi''\\psi')}{1} = \\kappa_\\alpha \\quad (\\text{curvature of the profile})\\]
        \\[\\kappa_2 = \\frac{g}{G} \\cdot \\frac{1}{\\varphi} = \\frac{\\psi'}{\\varphi} \\quad (\\text{geometric: } 1/\\text{distance to axis})\\]
        <p>Wait, let me be more careful. The actual formulas are:</p>
        \\[\\kappa_1 = \\frac{\\varphi'\\psi'' - \\varphi''\\psi'}{1} \\quad \\text{(profile curvature)}\\]
        \\[\\kappa_2 = \\frac{\\psi'}{\\varphi} \\quad \\text{(latitude circle curvature)}\\]
        <p>Therefore:</p>
        \\[K = \\kappa_1 \\kappa_2 = -\\frac{\\varphi''}{\\varphi}\\]
        \\[H = \\frac{1}{2}\\left(\\kappa_1 + \\frac{\\psi'}{\\varphi}\\right)\\]
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">The Beautiful Formula \\(K = -\\varphi''/\\varphi\\)</div>
    <div class="env-body">
        <p>This is one of the most elegant results in surface theory. For a surface of revolution with arc-length profile, the Gaussian curvature depends only on \\(\\varphi(v)\\) (the distance from the axis) and its second derivative. Consequences:</p>
        <ul>
            <li>Where \\(\\varphi'' < 0\\) (profile concave toward the axis), \\(K > 0\\) (elliptic).</li>
            <li>Where \\(\\varphi'' > 0\\) (profile convex away from axis), \\(K < 0\\) (hyperbolic).</li>
            <li>Where \\(\\varphi'' = 0\\) (inflection point of profile), \\(K = 0\\) (parabolic).</li>
        </ul>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Examples</div>
    <div class="env-body">
        <p><strong>Sphere</strong> (\\(\\varphi(v) = \\cos v, \\psi(v) = \\sin v\\)): \\(\\varphi'' = -\\cos v = -\\varphi\\), so \\(K = -(-\\cos v)/\\cos v = 1\\). Correct: \\(K = 1/R^2 = 1\\) for the unit sphere.</p>
        <p><strong>Cylinder</strong> (\\(\\varphi(v) = r, \\psi(v) = v\\)): \\(\\varphi'' = 0\\), so \\(K = 0\\). Intrinsically flat.</p>
        <p><strong>Cone</strong> (\\(\\varphi(v) = v\\sin\\alpha, \\psi(v) = v\\cos\\alpha\\)): \\(\\varphi'' = 0\\), so \\(K = 0\\). Also intrinsically flat (a cone can be unrolled).</p>
        <p><strong>Pseudosphere/Tractrix</strong>: \\(K = -1\\) everywhere. The surface of revolution of a tractrix has constant negative Gaussian curvature, making it a local model of the hyperbolic plane.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-surface-of-revolution"></div>
`,
            visualizations: [
                {
                    id: 'viz-surface-of-revolution',
                    title: 'Surface of Revolution: Profile Curve and Curvature',
                    description: 'Choose a profile curve and watch the surface of revolution form. The Gaussian curvature K is computed and displayed along the profile. The animation rotates the profile to sweep out the surface.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var profileType = 0;
                        var profiles = [
                            { name: 'Sphere', fn: function(t) { return [Math.cos(t), Math.sin(t)]; }, range: [-Math.PI/2+0.05, Math.PI/2-0.05] },
                            { name: 'Torus (section)', fn: function(t) { return [3 + 1.2*Math.cos(t), 1.2*Math.sin(t)]; }, range: [0, 2*Math.PI] },
                            { name: 'Catenoid', fn: function(t) { return [Math.cosh(t), t]; }, range: [-1.5, 1.5] },
                            { name: 'Vase', fn: function(t) { return [1.2 + 0.4*Math.sin(2.5*t), t]; }, range: [-1.5, 1.5] }
                        ];

                        var sweepAngle = 0;
                        var animating = true;

                        VizEngine.createButton(controls, 'Sphere', function() { profileType=0; });
                        VizEngine.createButton(controls, 'Torus', function() { profileType=1; });
                        VizEngine.createButton(controls, 'Catenoid', function() { profileType=2; });
                        VizEngine.createButton(controls, 'Vase', function() { profileType=3; });

                        function draw(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var prof = profiles[profileType];
                            sweepAngle = (t * 0.001) % (2 * Math.PI);

                            // Split canvas: left = profile + K plot, right = 3D surface
                            var midX = 220;

                            // --- Left: Profile curve ---
                            var pScale = 35;
                            var pCx = 100, pCy = 210;

                            ctx.strokeStyle = viz.colors.axis + '44';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(pCx, 40); ctx.lineTo(pCx, 380); ctx.stroke();

                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var steps = 200;
                            var rng = prof.range;
                            for (var i = 0; i <= steps; i++) {
                                var tt = rng[0] + (rng[1] - rng[0]) * i / steps;
                                var p = prof.fn(tt);
                                var sx = pCx + p[0] * pScale * 0.6;
                                var sy = pCy - p[1] * pScale;
                                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // K along profile (approximate)
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            var kStarted = false;
                            for (var i2 = 2; i2 <= steps - 2; i2++) {
                                var tt2 = rng[0] + (rng[1] - rng[0]) * i2 / steps;
                                var dt = (rng[1] - rng[0]) / steps;
                                var pm = prof.fn(tt2 - dt);
                                var p0 = prof.fn(tt2);
                                var pp = prof.fn(tt2 + dt);
                                var phi = p0[0];
                                var phiPP = (pp[0] - 2 * p0[0] + pm[0]) / (dt * dt);
                                if (phi < 0.05) continue;
                                var Kval = -phiPP / phi;
                                var kx = pCx + 130 + Kval * 30;
                                var ky = pCy - p0[1] * pScale;
                                if (!kStarted) { ctx.moveTo(kx, ky); kStarted = true; } else ctx.lineTo(kx, ky);
                            }
                            ctx.stroke();

                            viz.screenText('Profile', pCx, 25, viz.colors.blue, 12);
                            viz.screenText('K', pCx + 140, 25, viz.colors.red, 12);

                            // --- Right: 3D surface ---
                            var cx3d = 400, cy3d = 210;
                            var aY = 0.3, aX = 0.25;
                            var s3d = 22;

                            function rot(x, y, z) {
                                var c1=Math.cos(aY),s1=Math.sin(aY);
                                var x2=x*c1+z*s1, z2=-x*s1+z*c1;
                                var c2=Math.cos(aX),s2=Math.sin(aX);
                                return [x2, y*c2-z2*s2, y*s2+z2*c2];
                            }

                            // Draw wireframe of surface
                            var nu2 = 30, nv2 = 40;
                            var maxU = sweepAngle;

                            ctx.strokeStyle = viz.colors.teal + '55';
                            ctx.lineWidth = 0.8;

                            // v-lines (meridians)
                            for (var iu = 0; iu <= nu2; iu++) {
                                var u = maxU * iu / nu2;
                                ctx.beginPath();
                                var started2 = false;
                                for (var iv = 0; iv <= nv2; iv++) {
                                    var vv = rng[0] + (rng[1] - rng[0]) * iv / nv2;
                                    var pp2 = prof.fn(vv);
                                    var x3 = pp2[0] * Math.cos(u);
                                    var y3 = pp2[0] * Math.sin(u);
                                    var z3 = pp2[1];
                                    var r2 = rot(x3, y3, z3);
                                    var sx2 = cx3d + r2[0] * s3d;
                                    var sy2 = cy3d - r2[1] * s3d;
                                    if (!started2) { ctx.moveTo(sx2, sy2); started2 = true; } else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // u-lines (parallels)
                            for (var iv2 = 0; iv2 <= nv2; iv2 += 4) {
                                var vv2 = rng[0] + (rng[1] - rng[0]) * iv2 / nv2;
                                ctx.beginPath();
                                for (var iu2 = 0; iu2 <= nu2 * 2; iu2++) {
                                    var u2 = maxU * iu2 / (nu2 * 2);
                                    var pp3 = prof.fn(vv2);
                                    var x4 = pp3[0] * Math.cos(u2);
                                    var y4 = pp3[0] * Math.sin(u2);
                                    var z4 = pp3[1];
                                    var r3 = rot(x4, y4, z4);
                                    var sx3 = cx3d + r3[0] * s3d;
                                    var sy3 = cy3d - r3[1] * s3d;
                                    if (iu2 === 0) ctx.moveTo(sx3, sy3); else ctx.lineTo(sx3, sy3);
                                }
                                ctx.stroke();
                            }

                            viz.screenText(prof.name, cx3d, 25, viz.colors.teal, 13);
                            viz.screenText('Sweep: ' + Math.round(sweepAngle * 180 / Math.PI) + '\u00B0', cx3d, viz.height - 15, viz.colors.text, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: "Verify that \\(K = -\\varphi''/\\varphi\\) gives \\(K = 1/R^2\\) for a sphere of radius \\(R\\), parametrized by \\(\\varphi(v) = R\\cos v\\), \\(\\psi(v) = R\\sin v\\).",
                    hint: "Compute \\(\\varphi''\\) and substitute.",
                    solution: "\\(\\varphi(v) = R\\cos v\\), so \\(\\varphi' = -R\\sin v\\) and \\(\\varphi'' = -R\\cos v\\). Then \\(K = -\\varphi''/\\varphi = -(-R\\cos v)/(R\\cos v) = 1\\). But this is for the unit-speed profile of the unit sphere (\\(R=1\\)). For radius \\(R\\): the profile is \\((R\\cos(v/R), R\\sin(v/R))\\) in arc-length, giving \\(\\varphi'' = -(1/R)\\cos(v/R)\\), so \\(K = 1/R^2\\)."
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Theorema Egregium
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Bridge: From Curvatures to the Theorema Egregium</h2>

<p>This chapter established the two fundamental curvatures of a surface. Let us take stock of what we know and preview what comes next.</p>

<h3>What We Know</h3>
<ul>
    <li>\\(K = \\kappa_1 \\kappa_2 = \\frac{eg - f^2}{EG - F^2}\\): the Gaussian curvature, defined via the shape operator (hence involving the second fundamental form and the ambient \\(\\mathbb{R}^3\\)).</li>
    <li>\\(H = \\frac{\\kappa_1 + \\kappa_2}{2} = \\frac{eG - 2fF + gE}{2(EG - F^2)}\\): the mean curvature, also defined extrinsically.</li>
    <li>The sign of \\(K\\) classifies points as elliptic, hyperbolic, parabolic, or planar.</li>
    <li>\\(H = 0\\) characterizes minimal surfaces (critical points of area).</li>
</ul>

<h3>The Deep Question</h3>
<p>The formula \\(K = (eg - f^2)/(EG - F^2)\\) involves both fundamental forms. The first fundamental form \\(E, F, G\\) is intrinsic (it depends only on the metric). The second fundamental form \\(e, f, g\\) is extrinsic (it requires the normal \\(N\\), which depends on the embedding).</p>

<p>So \\(K\\) <em>appears</em> to depend on the embedding. But Gauss proved the astonishing fact that it does not:</p>

<div class="env-block theorem">
    <div class="env-title">Theorema Egregium (Preview)</div>
    <div class="env-body">
        <p>The Gaussian curvature \\(K\\) can be expressed purely in terms of \\(E, F, G\\) and their first and second derivatives with respect to \\(u, v\\). Therefore \\(K\\) is an <strong>intrinsic invariant</strong>: it is preserved by any isometry (distance-preserving map) of the surface.</p>
    </div>
</div>

<p>This is why \\(K = 0\\) for the cylinder: a cylinder is isometric to a flat plane (just unroll it), so they must have the same \\(K\\). And this is why \\(K \\neq 0\\) for the sphere: no matter how you try to make a flat map of the Earth, you cannot avoid distorting distances.</p>

<h3>What Comes Next</h3>
<ul>
    <li><strong>Chapter 7 (Geodesics):</strong> The curves that play the role of "straight lines" on a surface. Geodesics are determined by the metric alone (they are intrinsic), and their behavior is governed by \\(K\\).</li>
    <li><strong>Chapter 8 (Theorema Egregium):</strong> The full proof that \\(K\\) is intrinsic, plus Gauss's explicit formula for \\(K\\) in terms of \\(E, F, G\\) and their derivatives.</li>
    <li><strong>Chapter 9 (Gauss-Bonnet):</strong> The global theorem connecting \\(K\\) to topology: \\(\\int_S K \\, dA = 2\\pi \\chi(S)\\). The total curvature of a surface determines its Euler characteristic (and hence its genus).</li>
    <li><strong>Chapter 10 (Minimal Surfaces):</strong> The condition \\(H = 0\\) and its consequences: soap films, Plateau's problem, and the catenoid.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">A Unified View</div>
    <div class="env-body">
        <p>The Gaussian and mean curvatures are the symmetric functions of the eigenvalues of the shape operator:</p>
        \\[K = \\sigma_2(\\kappa_1, \\kappa_2) = \\kappa_1 \\kappa_2, \\qquad 2H = \\sigma_1(\\kappa_1, \\kappa_2) = \\kappa_1 + \\kappa_2.\\]
        <p>Equivalently, \\(\\kappa_1\\) and \\(\\kappa_2\\) are the roots of \\(\\lambda^2 - 2H\\lambda + K = 0\\). Knowing \\(K\\) and \\(H\\) is equivalent to knowing the principal curvatures (up to labeling).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-torus-curvature"></div>
`,
            visualizations: [
                {
                    id: 'viz-torus-curvature',
                    title: 'Torus: The Complete Curvature Story',
                    description: 'The torus demonstrates all curvature phenomena. Outer ring: \\(K > 0\\) (elliptic, red). Inner ring: \\(K < 0\\) (hyperbolic, blue). Top/bottom circles: \\(K = 0\\) (parabolic, white). By Gauss-Bonnet: \\(\\int K\\,dA = 0\\) since the torus has Euler characteristic \\(\\chi = 0\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 200, scale: 1
                        });

                        var R = 3.2, rr = 1.3;
                        var aY = 0, aX = 0.35;
                        var showK = true;

                        VizEngine.createButton(controls, 'Show K', function() { showK = true; });
                        VizEngine.createButton(controls, 'Show H', function() { showK = false; });

                        function torusK(v) { return Math.cos(v) / (rr * (R + rr * Math.cos(v))); }
                        function torusH(v) { return -(R + 2*rr*Math.cos(v)) / (2*rr*(R + rr*Math.cos(v))); }

                        function curvColor(val, maxV) {
                            var t = Math.max(-1, Math.min(1, val / maxV));
                            if (t > 0) return [255, Math.round(255*(1-t)), Math.round(255*(1-t))];
                            else return [Math.round(255*(1+t)), Math.round(255*(1+t)), 255];
                        }

                        function heatCol(val, maxV) {
                            var t = Math.min(1, Math.abs(val) / maxV);
                            return [Math.round(255*Math.min(1, t*2)), Math.round(180*Math.max(0, t-0.3)), Math.round(255*(1-t)*0.7)];
                        }

                        function draw(time) {
                            viz.clear();
                            var ctx = viz.ctx;
                            aY = time * 0.0004;

                            var nu = 60, nv = 30;
                            var maxK = 1 / (rr * (R - rr));
                            var maxH = Math.abs(torusH(0)) * 1.2;

                            var quads = [];
                            for (var i = 0; i < nu; i++) {
                                for (var j = 0; j < nv; j++) {
                                    var u0=(i/nu)*2*Math.PI, u1=((i+1)/nu)*2*Math.PI;
                                    var v0=(j/nv)*2*Math.PI, v1=((j+1)/nv)*2*Math.PI;
                                    var vM=(v0+v1)/2;

                                    function tp2(u,v) {
                                        var x=(R+rr*Math.cos(v))*Math.cos(u);
                                        var y=(R+rr*Math.cos(v))*Math.sin(u);
                                        var z=rr*Math.sin(v);
                                        var c1=Math.cos(aY),s1=Math.sin(aY);
                                        var x2=x*c1+z*s1, z2=-x*s1+z*c1;
                                        var c2=Math.cos(aX),s2=Math.sin(aX);
                                        return [x2, y*c2-z2*s2, y*s2+z2*c2];
                                    }

                                    var p00=tp2(u0,v0),p10=tp2(u1,v0),p01=tp2(u0,v1),p11=tp2(u1,v1);
                                    var pm=[(p00[0]+p10[0]+p01[0]+p11[0])/4,(p00[1]+p10[1]+p01[1]+p11[1])/4,(p00[2]+p10[2]+p01[2]+p11[2])/4];

                                    var ax=p10[0]-p00[0],ay=p10[1]-p00[1],az=p10[2]-p00[2];
                                    var bx=p01[0]-p00[0],by=p01[1]-p00[1],bz=p01[2]-p00[2];
                                    var nz=ax*by-ay*bx;
                                    if(-nz<0) continue;
                                    var nl=Math.sqrt((ay*bz-az*by)**2+(az*bx-ax*bz)**2+nz**2)+0.001;
                                    var shade=Math.max(0.35, 0.5+0.5*Math.abs(nz)/nl);

                                    var rgb;
                                    if (showK) {
                                        rgb = curvColor(torusK(vM), maxK);
                                    } else {
                                        rgb = heatCol(torusH(vM), maxH);
                                    }

                                    var cr=Math.round(rgb[0]*shade), cg=Math.round(rgb[1]*shade), cb=Math.round(rgb[2]*shade);

                                    var d2=15;
                                    function prj(p) {
                                        var s=d2/(d2+p[2])*38;
                                        return [p[0]*s+viz.originX, -p[1]*s+viz.originY];
                                    }

                                    quads.push({
                                        pts:[prj(p00),prj(p10),prj(p11),prj(p01)],
                                        depth:pm[2],
                                        col:'rgb('+cr+','+cg+','+cb+')'
                                    });
                                }
                            }
                            quads.sort(function(a,b){return a.depth-b.depth;});
                            for (var q=0; q<quads.length; q++) {
                                ctx.fillStyle=quads[q].col;
                                ctx.beginPath();
                                ctx.moveTo(quads[q].pts[0][0],quads[q].pts[0][1]);
                                ctx.lineTo(quads[q].pts[1][0],quads[q].pts[1][1]);
                                ctx.lineTo(quads[q].pts[2][0],quads[q].pts[2][1]);
                                ctx.lineTo(quads[q].pts[3][0],quads[q].pts[3][1]);
                                ctx.closePath();
                                ctx.fill();
                            }

                            var label = showK ? 'Gaussian Curvature K' : 'Mean Curvature H';
                            viz.screenText('Torus: ' + label, viz.width/2, 18, viz.colors.white, 15);

                            // Legend
                            var legX=20, legY=viz.height-55, legW=140, legH=12;
                            for (var lx=0; lx<legW; lx++) {
                                var lt=(lx/legW - 0.5)*2;
                                var lrgb;
                                if (showK) lrgb = curvColor(lt, 1);
                                else lrgb = heatCol(lt, 1);
                                ctx.fillStyle='rgb('+lrgb[0]+','+lrgb[1]+','+lrgb[2]+')';
                                ctx.fillRect(legX+lx, legY, 1, legH);
                            }
                            ctx.fillStyle=viz.colors.text; ctx.font='10px -apple-system,sans-serif'; ctx.textAlign='center';
                            if (showK) {
                                ctx.fillText('K < 0', legX, legY+legH+12);
                                ctx.fillText('K = 0', legX+legW/2, legY+legH+12);
                                ctx.fillText('K > 0', legX+legW, legY+legH+12);
                            } else {
                                ctx.fillText('|H| small', legX, legY+legH+12);
                                ctx.fillText('|H| large', legX+legW, legY+legH+12);
                            }

                            // Gauss-Bonnet note
                            viz.screenText('\u222BK dA = 2\u03C0\u03C7(T\u00B2) = 0', viz.width/2, viz.height-12, viz.colors.teal, 12);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The Gauss-Bonnet theorem states \\(\\int_S K \\, dA = 2\\pi\\chi(S)\\). The torus has \\(\\chi = 0\\). Verify this by integrating \\(K = \\cos v / [r(R + r\\cos v)]\\) over the torus.',
                    hint: 'The area element is \\(dA = r(R + r\\cos v) \\, du \\, dv\\). What does the integrand simplify to?',
                    solution: '\\(\\int_0^{2\\pi}\\int_0^{2\\pi} \\frac{\\cos v}{r(R + r\\cos v)} \\cdot r(R + r\\cos v) \\, dv \\, du = \\int_0^{2\\pi} du \\int_0^{2\\pi} \\cos v \\, dv = 2\\pi \\cdot 0 = 0.\\) The area element exactly cancels the denominator of \\(K\\)!'
                },
                {
                    question: "Why can't you make a flat (\\(K = 0\\)) map of the Earth without distortion? Use the Theorema Egregium.",
                    hint: 'A map is a smooth map from (part of) the sphere to the plane. What would an isometry preserve?',
                    solution: 'The sphere has \\(K = 1/R^2 > 0\\). The plane has \\(K = 0\\). By the Theorema Egregium, any isometry preserves \\(K\\). Since \\(1/R^2 \\neq 0\\), no isometry from the sphere to the plane can exist. Every flat map of the Earth must distort either distances, angles, or areas (or all three).'
                },
                {
                    question: 'For the ellipsoid \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} + \\frac{z^2}{c^2} = 1\\), show that \\(K > 0\\) everywhere.',
                    hint: 'An ellipsoid is convex. What does this imply about the principal curvatures?',
                    solution: 'The ellipsoid is a compact convex surface. At every point, both principal curvatures have the same sign (the surface lies on one side of every tangent plane). Therefore \\(K = \\kappa_1 \\kappa_2 > 0\\) everywhere. In fact, \\(K = \\frac{1}{a^2 b^2 c^2} \\left(\\frac{x^2}{a^4} + \\frac{y^2}{b^4} + \\frac{z^2}{c^4}\\right)^{-2}\\), which is always positive.'
                }
            ]
        }
    ]
});
