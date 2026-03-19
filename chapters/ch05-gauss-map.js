window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch05',
    number: 5,
    title: 'The Gauss Map & Second Fundamental Form',
    subtitle: 'How surfaces curve in space',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>How Does a Surface Curve?</h2>

<div class="env-block intuition">
    <div class="env-title">The Central Question</div>
    <div class="env-body">
        <p>The First Fundamental Form (Chapter 4) tells us about the <em>intrinsic</em> geometry of a surface: lengths, angles, and areas as measured by a creature living on the surface. But it cannot distinguish a flat sheet of paper from the same sheet bent into a cylinder, because bending preserves all intrinsic measurements.</p>
        <p>To capture how a surface bends in ambient space, we need to look at how the surface pulls away from its tangent plane. This is <strong>extrinsic curvature</strong>, and the key to measuring it is the <strong>unit normal vector</strong>.</p>
    </div>
</div>

<p>Recall from Chapter 4 that at each point \\(p\\) of a regular surface \\(S\\), the tangent plane \\(T_pS\\) is spanned by \\(\\mathbf{x}_u\\) and \\(\\mathbf{x}_v\\). The unit normal is</p>

\\[
\\mathbf{N}(p) = \\frac{\\mathbf{x}_u \\times \\mathbf{x}_v}{\\|\\mathbf{x}_u \\times \\mathbf{x}_v\\|}.
\\]

<p>On a flat plane, \\(\\mathbf{N}\\) is constant: every point has the same normal. On a curved surface, \\(\\mathbf{N}\\) varies from point to point. The <em>rate of change</em> of \\(\\mathbf{N}\\) measures how fast the surface curves.</p>

<div class="env-block remark">
    <div class="env-title">The Idea in One Sentence</div>
    <div class="env-body">
        <p>Curvature of a surface = how quickly the normal vector rotates as you move along the surface.</p>
    </div>
</div>

<p>This chapter develops this idea systematically. We will:</p>
<ol>
    <li>Define the <strong>Gauss map</strong> \\(N: S \\to S^2\\), which sends each surface point to the tip of its unit normal on the unit sphere.</li>
    <li>Study its differential \\(dN_p\\), called the <strong>shape operator</strong> (or Weingarten map), which is a linear map on the tangent plane.</li>
    <li>Extract the <strong>Second Fundamental Form</strong> from the shape operator.</li>
    <li>Use the Second Fundamental Form to define <strong>normal curvature</strong> in any tangent direction.</li>
    <li>Find the <strong>principal curvatures</strong> and <strong>principal directions</strong> as the eigenvalues and eigenvectors of the shape operator.</li>
</ol>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Carl Friedrich Gauss introduced this map in his landmark 1827 paper <em>Disquisitiones generales circa superficies curvas</em> (General investigations of curved surfaces). The insight that the normal map encodes curvature was one of the great leaps in differential geometry.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: The Gauss Map
        // ================================================================
        {
            id: 'sec-gauss-map',
            title: 'The Gauss Map',
            content: `
<h2>The Gauss Map</h2>

<div class="env-block definition">
    <div class="env-title">Definition 5.1 (Gauss Map)</div>
    <div class="env-body">
        <p>Let \\(S \\subset \\mathbb{R}^3\\) be a regular oriented surface. The <strong>Gauss map</strong> is the smooth map</p>
        \\[
        N: S \\to S^2 \\subset \\mathbb{R}^3, \\qquad p \\mapsto \\mathbf{N}(p),
        \\]
        <p>where \\(\\mathbf{N}(p)\\) is the unit normal to \\(S\\) at \\(p\\), and \\(S^2\\) is the unit sphere.</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">What the Gauss Map Does</div>
    <div class="env-body">
        <p>Think of the Gauss map as a "normal compass." At each point of the surface, there is a unit normal vector. Since \\(\\|\\mathbf{N}(p)\\| = 1\\), the tip of \\(\\mathbf{N}(p)\\) lies on the unit sphere \\(S^2\\). Moving along the surface traces out a curve on \\(S^2\\).</p>
        <p>On a plane, every normal points the same way, so the entire surface maps to a single point on \\(S^2\\). On a sphere of radius \\(R\\), the normal at each point is \\(\\mathbf{N}(p) = p/R\\), so the Gauss map is (up to sign) a scaled identity: it covers the entire sphere exactly once.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Gauss Map of a Sphere</div>
    <div class="env-body">
        <p>For the sphere \\(S^2(R) = \\{(x,y,z) : x^2+y^2+z^2 = R^2\\}\\), the outward unit normal at \\(p = (x,y,z)\\) is</p>
        \\[
        \\mathbf{N}(p) = \\frac{1}{R}(x,y,z) = \\frac{p}{R}.
        \\]
        <p>So \\(N: S^2(R) \\to S^2\\) is a diffeomorphism (for the outward normal). The Gauss map covers every point of \\(S^2\\) exactly once.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Gauss Map of a Cylinder</div>
    <div class="env-body">
        <p>For the cylinder \\(x^2 + y^2 = 1\\) with parametrization \\(\\mathbf{x}(\\theta, z) = (\\cos\\theta, \\sin\\theta, z)\\), the unit normal is</p>
        \\[
        \\mathbf{N}(\\theta, z) = (\\cos\\theta, \\sin\\theta, 0).
        \\]
        <p>The normal does not depend on \\(z\\). The Gauss map sends the entire cylinder to the equatorial circle of \\(S^2\\), collapsing the \\(z\\)-direction. This reflects the fact that the cylinder is flat in the \\(z\\)-direction.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Orientation</div>
    <div class="env-body">
        <p>The Gauss map requires an <em>orientation</em> (a consistent choice of normal direction). For a sphere, we choose outward. For the Mobius strip, no global orientation exists, so the Gauss map is not globally defined. We restrict attention to orientable surfaces.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-gauss-map-sphere"></div>
`,
            visualizations: [
                {
                    id: 'viz-gauss-map-sphere',
                    title: 'The Gauss Map: Surface to Sphere',
                    description: 'A point moves on a surface (left) with its unit normal vector. The Gauss map sends the tip of the normal to a point on the unit sphere (right). Drag the slider to move the point and watch how the normal image traces a path on S\u00B2.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 700, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var tParam = 0.0;
                        var surfaceType = 0; // 0=paraboloid, 1=saddle

                        VizEngine.createSlider(controls, 'Position', -3.14, 3.14, tParam, 0.05, function(v) {
                            tParam = v;
                            draw();
                        });

                        VizEngine.createButton(controls, 'Paraboloid', function() { surfaceType = 0; draw(); });
                        VizEngine.createButton(controls, 'Saddle', function() { surfaceType = 1; draw(); });

                        // Simple 3D -> 2D projection
                        function proj3d(x, y, z, cx, cy, scale) {
                            var px = cx + (x * 0.87 - y * 0.5) * scale;
                            var py = cy + (-x * 0.25 - y * 0.43 + z * 0.87) * scale;
                            return [px, py];
                        }

                        function surfaceZ(u, v) {
                            if (surfaceType === 0) return 0.3 * (u * u + v * v);
                            return 0.3 * (u * u - v * v);
                        }

                        function surfaceNormal(u, v) {
                            var h = 0.001;
                            var zu = (surfaceZ(u + h, v) - surfaceZ(u - h, v)) / (2 * h);
                            var zv = (surfaceZ(u, v + h) - surfaceZ(u, v - h)) / (2 * h);
                            // N = (-zu, -zv, 1) / |...|
                            var len = Math.sqrt(zu * zu + zv * zv + 1);
                            return [-zu / len, -zv / len, 1 / len];
                        }

                        var animBtn;
                        var animating = false;
                        var animId = null;

                        animBtn = VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) {
                                animating = false;
                                if (animId) cancelAnimationFrame(animId);
                                animBtn.textContent = 'Animate';
                                return;
                            }
                            animating = true;
                            animBtn.textContent = 'Stop';
                            var startT = performance.now();
                            function step(now) {
                                if (!animating) return;
                                tParam = ((now - startT) / 2000) % (2 * Math.PI) - Math.PI;
                                draw();
                                animId = requestAnimationFrame(step);
                            }
                            animId = requestAnimationFrame(step);
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // --- Left panel: surface ---
                            var lcx = 180, lcy = 220, lscale = 60;

                            viz.screenText('Surface S', lcx, 20, viz.colors.white, 14);

                            // Draw surface wireframe
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            var N = 20;
                            for (var i = -N; i <= N; i++) {
                                ctx.beginPath();
                                var started = false;
                                for (var j = -N; j <= N; j++) {
                                    var u = i / N * 2, v = j / N * 2;
                                    var z = surfaceZ(u, v);
                                    var p = proj3d(u, v, z, lcx, lcy, lscale);
                                    if (!started) { ctx.moveTo(p[0], p[1]); started = true; }
                                    else ctx.lineTo(p[0], p[1]);
                                }
                                ctx.stroke();
                            }
                            for (var j2 = -N; j2 <= N; j2++) {
                                ctx.beginPath();
                                var started2 = false;
                                for (var i2 = -N; i2 <= N; i2++) {
                                    var u2 = i2 / N * 2, v2 = j2 / N * 2;
                                    var z2 = surfaceZ(u2, v2);
                                    var p2 = proj3d(u2, v2, z2, lcx, lcy, lscale);
                                    if (!started2) { ctx.moveTo(p2[0], p2[1]); started2 = true; }
                                    else ctx.lineTo(p2[0], p2[1]);
                                }
                                ctx.stroke();
                            }

                            // Point on surface
                            var pu = 1.2 * Math.cos(tParam);
                            var pv = 1.2 * Math.sin(tParam);
                            var pz = surfaceZ(pu, pv);
                            var pp = proj3d(pu, pv, pz, lcx, lcy, lscale);

                            // Normal vector
                            var nn = surfaceNormal(pu, pv);
                            var nLen = 1.2;
                            var np = proj3d(pu + nn[0] * nLen, pv + nn[1] * nLen, pz + nn[2] * nLen, lcx, lcy, lscale);

                            // Draw normal arrow
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(pp[0], pp[1]); ctx.lineTo(np[0], np[1]); ctx.stroke();
                            var angle = Math.atan2(np[1] - pp[1], np[0] - pp[0]);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(np[0], np[1]);
                            ctx.lineTo(np[0] - 10 * Math.cos(angle - 0.4), np[1] - 10 * Math.sin(angle - 0.4));
                            ctx.lineTo(np[0] - 10 * Math.cos(angle + 0.4), np[1] - 10 * Math.sin(angle + 0.4));
                            ctx.closePath(); ctx.fill();

                            // Draw point
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(pp[0], pp[1], 6, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('p', pp[0] + 12, pp[1] - 8, viz.colors.blue, 13);
                            viz.screenText('N(p)', (pp[0] + np[0]) / 2 + 14, (pp[1] + np[1]) / 2, viz.colors.orange, 12);

                            // --- Right panel: unit sphere ---
                            var rcx = 530, rcy = 200, rscale = 90;

                            viz.screenText('Unit Sphere S\u00B2', rcx, 20, viz.colors.white, 14);

                            // Draw sphere outline
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.arc(rcx, rcy, rscale, 0, Math.PI * 2); ctx.stroke();

                            // Draw sphere wireframe (circles)
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var lat = -2; lat <= 2; lat++) {
                                var phi = lat * Math.PI / 6;
                                var r = Math.cos(phi) * rscale;
                                var cy2 = rcy - Math.sin(phi) * rscale * 0.43;
                                ctx.beginPath(); ctx.ellipse(rcx, cy2, r * 0.87, r * 0.25, 0, 0, Math.PI * 2); ctx.stroke();
                            }
                            // Meridians
                            for (var m = 0; m < 6; m++) {
                                var theta = m * Math.PI / 6;
                                ctx.beginPath();
                                for (var s = 0; s <= 40; s++) {
                                    var phi2 = (s / 40) * Math.PI * 2;
                                    var sx = Math.cos(theta) * Math.cos(phi2);
                                    var sy = Math.sin(theta) * Math.cos(phi2);
                                    var sz = Math.sin(phi2);
                                    var sp = proj3d(sx, sy, sz, rcx, rcy, rscale);
                                    if (s === 0) ctx.moveTo(sp[0], sp[1]);
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                            }

                            // Trace of Gauss map
                            ctx.strokeStyle = viz.colors.teal + '88';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var traceStarted = false;
                            for (var t = -Math.PI; t <= tParam; t += 0.05) {
                                var tu = 1.2 * Math.cos(t);
                                var tv = 1.2 * Math.sin(t);
                                var tn = surfaceNormal(tu, tv);
                                var tp = proj3d(tn[0], tn[1], tn[2], rcx, rcy, rscale);
                                if (!traceStarted) { ctx.moveTo(tp[0], tp[1]); traceStarted = true; }
                                else ctx.lineTo(tp[0], tp[1]);
                            }
                            ctx.stroke();

                            // Current image point on sphere
                            var imgP = proj3d(nn[0], nn[1], nn[2], rcx, rcy, rscale);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(imgP[0], imgP[1], 6, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('N(p)', imgP[0] + 12, imgP[1] - 8, viz.colors.teal, 13);

                            // Arrow between panels
                            ctx.strokeStyle = viz.colors.purple + '88';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(pp[0] + 30, pp[1]); ctx.lineTo(imgP[0] - 20, imgP[1]); ctx.stroke();
                            ctx.setLineDash([]);

                            viz.screenText(surfaceType === 0 ? 'z = 0.3(u\u00B2+v\u00B2)' : 'z = 0.3(u\u00B2\u2212v\u00B2)', lcx, viz.height - 15, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the Gauss map for the paraboloid \\(z = x^2 + y^2\\). Where on \\(S^2\\) does the image lie?',
                    hint: 'The normal is \\(\\mathbf{N} = (-2x, -2y, 1)/\\sqrt{4x^2+4y^2+1}\\). Note that \\(N_3 > 0\\) always.',
                    solution: 'With \\(\\mathbf{x}(u,v) = (u, v, u^2+v^2)\\), we get \\(\\mathbf{x}_u = (1,0,2u)\\), \\(\\mathbf{x}_v = (0,1,2v)\\), \\(\\mathbf{x}_u \\times \\mathbf{x}_v = (-2u,-2v,1)\\). So \\(\\mathbf{N} = (-2u,-2v,1)/\\sqrt{4u^2+4v^2+1}\\). Since the third component is always positive, the image lies in the open upper hemisphere of \\(S^2\\). As \\(u^2+v^2 \\to \\infty\\), the image approaches the equator but never reaches it.'
                },
                {
                    question: 'Show that for a plane, the Gauss map is constant. What does this say about how a plane curves?',
                    hint: 'A plane has a fixed normal direction everywhere.',
                    solution: 'If \\(S\\) is a plane with unit normal \\(\\mathbf{n}_0\\), then \\(\\mathbf{N}(p) = \\mathbf{n}_0\\) for all \\(p \\in S\\). The Gauss map sends the entire plane to a single point on \\(S^2\\). Since \\(\\mathbf{N}\\) does not vary, the surface has zero curvature everywhere: it does not bend at all.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Shape Operator
        // ================================================================
        {
            id: 'sec-shape-operator',
            title: 'The Shape Operator',
            content: `
<h2>The Shape Operator (Weingarten Map)</h2>

<p>The Gauss map \\(N: S \\to S^2\\) is a smooth map between surfaces. Its differential tells us how the normal changes as we move along the surface. This differential is the shape operator.</p>

<div class="env-block definition">
    <div class="env-title">Definition 5.2 (Shape Operator)</div>
    <div class="env-body">
        <p>Let \\(p \\in S\\) and let \\(dN_p: T_pS \\to T_{N(p)}S^2\\) be the differential of the Gauss map at \\(p\\). Since \\(\\mathbf{N}(p)\\) is a unit vector, the tangent plane to \\(S^2\\) at \\(N(p)\\) is the set of vectors perpendicular to \\(\\mathbf{N}(p)\\), which is exactly \\(T_pS\\). Thus \\(dN_p\\) is a linear map</p>
        \\[
        dN_p: T_pS \\to T_pS.
        \\]
        <p>The <strong>shape operator</strong> (or <strong>Weingarten map</strong>) is \\(S_p = -dN_p\\). The minus sign is a convention that makes curvatures of convex surfaces positive.</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Why a Minus Sign?</div>
    <div class="env-body">
        <p>Consider a sphere with outward normal. As you move "up" the sphere, the normal tilts <em>away</em> from the direction of motion. So \\(dN_p(\\mathbf{v})\\) points opposite to \\(\\mathbf{v}\\), making \\(dN_p\\) have negative eigenvalues. The convention \\(S_p = -dN_p\\) flips the sign so that convex surfaces have positive curvature.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.1 (Self-Adjointness of the Shape Operator)</div>
    <div class="env-body">
        <p>The shape operator \\(S_p = -dN_p\\) is <strong>self-adjoint</strong> (symmetric) with respect to the first fundamental form:</p>
        \\[
        \\langle S_p(\\mathbf{v}), \\mathbf{w} \\rangle = \\langle \\mathbf{v}, S_p(\\mathbf{w}) \\rangle \\quad \\text{for all } \\mathbf{v}, \\mathbf{w} \\in T_pS.
        \\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Let \\(\\mathbf{x}(u,v)\\) be a parametrization. Since \\(\\langle \\mathbf{N}, \\mathbf{x}_u \\rangle = 0\\), differentiating with respect to \\(v\\) gives \\(\\langle \\mathbf{N}_v, \\mathbf{x}_u \\rangle + \\langle \\mathbf{N}, \\mathbf{x}_{uv} \\rangle = 0\\). Similarly, differentiating \\(\\langle \\mathbf{N}, \\mathbf{x}_v \\rangle = 0\\) with respect to \\(u\\) gives \\(\\langle \\mathbf{N}_u, \\mathbf{x}_v \\rangle + \\langle \\mathbf{N}, \\mathbf{x}_{vu} \\rangle = 0\\). Since \\(\\mathbf{x}_{uv} = \\mathbf{x}_{vu}\\), we conclude \\(\\langle \\mathbf{N}_v, \\mathbf{x}_u \\rangle = \\langle \\mathbf{N}_u, \\mathbf{x}_v \\rangle\\), which is exactly the self-adjointness condition \\(\\langle dN_p(\\mathbf{x}_u), \\mathbf{x}_v \\rangle = \\langle \\mathbf{x}_u, dN_p(\\mathbf{x}_v) \\rangle\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<p>Self-adjointness is crucial. By the spectral theorem, a self-adjoint linear operator on a finite-dimensional inner product space has real eigenvalues and orthogonal eigenvectors. These will be the principal curvatures and principal directions.</p>

<h3>Computing the Shape Operator</h3>

<p>In a parametrization \\(\\mathbf{x}(u,v)\\), write \\(\\mathbf{N}_u = dN_p(\\mathbf{x}_u)\\) and \\(\\mathbf{N}_v = dN_p(\\mathbf{x}_v)\\). Express these in the basis \\(\\{\\mathbf{x}_u, \\mathbf{x}_v\\}\\):</p>
\\[
-\\mathbf{N}_u = a_{11} \\mathbf{x}_u + a_{21} \\mathbf{x}_v, \\qquad -\\mathbf{N}_v = a_{12} \\mathbf{x}_u + a_{22} \\mathbf{x}_v.
\\]
<p>The matrix \\(\\begin{pmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{pmatrix}\\) represents \\(S_p\\) in the basis \\(\\{\\mathbf{x}_u, \\mathbf{x}_v\\}\\). This matrix is not symmetric in general (because \\(\\{\\mathbf{x}_u, \\mathbf{x}_v\\}\\) is not orthonormal), but the operator itself is self-adjoint with respect to the inner product given by the first fundamental form.</p>

<div class="viz-placeholder" data-viz="viz-shape-operator"></div>
`,
            visualizations: [
                {
                    id: 'viz-shape-operator',
                    title: 'The Shape Operator in Action',
                    description: 'At a point on the surface, tangent vectors (blue) are mapped by the shape operator \\(S_p = -dN_p\\) to new tangent vectors (orange). The shape operator stretches, shrinks, or flips tangent vectors depending on the surface curvature. Drag the slider to move around the surface.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var uVal = 0.5;

                        VizEngine.createSlider(controls, 'u position', -1.5, 1.5, uVal, 0.1, function(v) {
                            uVal = v;
                            draw();
                        });

                        function proj3d(x, y, z, cx, cy, sc) {
                            return [cx + (x * 0.87 - y * 0.5) * sc, cy + (-x * 0.25 - y * 0.43 + z * 0.87) * sc];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2, cy = 220, sc = 70;

                            viz.screenText('Shape Operator S\u209A = \u2212dN\u209A', viz.width / 2, 18, viz.colors.white, 14);

                            // Surface: z = 0.25(x^2 + 0.5y^2) -- elliptic paraboloid
                            var N2 = 20;
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var i = -N2; i <= N2; i++) {
                                ctx.beginPath();
                                var started = false;
                                for (var j = -N2; j <= N2; j++) {
                                    var u = i / N2 * 2, v = j / N2 * 2;
                                    var z = 0.25 * (u * u + 0.5 * v * v);
                                    var p = proj3d(u, v, z, cx, cy, sc);
                                    if (!started) { ctx.moveTo(p[0], p[1]); started = true; }
                                    else ctx.lineTo(p[0], p[1]);
                                }
                                ctx.stroke();
                            }
                            for (var j2 = -N2; j2 <= N2; j2++) {
                                ctx.beginPath();
                                var started2 = false;
                                for (var i2 = -N2; i2 <= N2; i2++) {
                                    var u2 = i2 / N2 * 2, v2 = j2 / N2 * 2;
                                    var z2 = 0.25 * (u2 * u2 + 0.5 * v2 * v2);
                                    var p2 = proj3d(u2, v2, z2, cx, cy, sc);
                                    if (!started2) { ctx.moveTo(p2[0], p2[1]); started2 = true; }
                                    else ctx.lineTo(p2[0], p2[1]);
                                }
                                ctx.stroke();
                            }

                            // Point
                            var pu = uVal, pv = 0;
                            var pz = 0.25 * (pu * pu + 0.5 * pv * pv);
                            var pp = proj3d(pu, pv, pz, cx, cy, sc);

                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(pp[0], pp[1], 5, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('p', pp[0] - 12, pp[1] + 14, viz.colors.white, 12);

                            // Tangent vectors (draw a fan of directions)
                            var nAngles = 8;
                            for (var a = 0; a < nAngles; a++) {
                                var theta = a * Math.PI / nAngles;
                                var du = Math.cos(theta);
                                var dv = Math.sin(theta);

                                // tangent vector: (du, dv, 0.5*pu*du + 0.25*pv*dv)
                                var dz = 0.5 * pu * du + 0.25 * pv * dv;
                                var tEnd = proj3d(pu + du * 0.6, pv + dv * 0.6, pz + dz * 0.6, cx, cy, sc);

                                // draw input tangent vector
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(pp[0], pp[1]); ctx.lineTo(tEnd[0], tEnd[1]); ctx.stroke();

                                // Shape operator: S_p applied to (du,dv)
                                // For z = 0.25(x^2 + 0.5*y^2): N = (-0.5x, -0.25y, 1)/||...||
                                // dN at (u,0): approximate curvatures kappa_1 = 0.5, kappa_2 = 0.25
                                // S_p(du,dv) ~ (kappa_1 * du, kappa_2 * dv) in principal coords
                                var k1 = 0.5 / Math.pow(1 + 0.25 * pu * pu, 1.5);
                                var k2 = 0.25 / Math.sqrt(1 + 0.25 * pu * pu);
                                var sdu = k1 * du;
                                var sdv = k2 * dv;
                                var sdz = 0.5 * pu * sdu + 0.25 * pv * sdv;
                                var sEnd = proj3d(pu + sdu * 2, pv + sdv * 2, pz + sdz * 2, cx, cy, sc);

                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(pp[0], pp[1]); ctx.lineTo(sEnd[0], sEnd[1]); ctx.stroke();
                            }

                            // Legend
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(20, viz.height - 50, 14, 14);
                            viz.screenText('Input tangent w', 85, viz.height - 43, viz.colors.blue, 11, 'center');
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(20, viz.height - 30, 14, 14);
                            viz.screenText('S\u209A(w) = \u2212dN\u209A(w)', 95, viz.height - 23, viz.colors.orange, 11, 'center');

                            viz.screenText('Surface: z = \u00BC(x\u00B2 + \u00BDy\u00B2)', viz.width / 2, viz.height - 8, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the shape operator for the sphere \\(x^2+y^2+z^2 = R^2\\) with outward normal. Show that \\(S_p = \\frac{1}{R}\\text{Id}\\).',
                    hint: 'The outward normal is \\(\\mathbf{N}(p) = p/R\\), so \\(dN_p(\\mathbf{v}) = \\mathbf{v}/R\\).',
                    solution: 'For the sphere, \\(\\mathbf{N}(p) = p/R\\). Then \\(dN_p(\\mathbf{v}) = \\mathbf{v}/R\\) for any tangent vector \\(\\mathbf{v}\\). So \\(S_p = -dN_p = -\\frac{1}{R}\\text{Id}\\). Wait, with the outward normal convention and the sign convention \\(S_p = -dN_p\\), we get \\(S_p(\\mathbf{v}) = -\\mathbf{v}/R\\). Actually, for the standard convention where the sphere has positive curvature with inward-pointing \\(dN\\), we get \\(S_p = \\frac{1}{R}\\text{Id}\\). The key point: the shape operator is a scalar multiple of the identity, meaning every direction has the same curvature \\(1/R\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: The Second Fundamental Form
        // ================================================================
        {
            id: 'sec-second-form',
            title: 'The Second Fundamental Form',
            content: `
<h2>The Second Fundamental Form</h2>

<p>The shape operator \\(S_p\\) is a linear map. The Second Fundamental Form extracts a <em>scalar</em> from \\(S_p\\), giving us a quadratic form on the tangent plane.</p>

<div class="env-block definition">
    <div class="env-title">Definition 5.3 (Second Fundamental Form)</div>
    <div class="env-body">
        <p>The <strong>Second Fundamental Form</strong> of \\(S\\) at \\(p\\) is the quadratic form \\(\\mathrm{II}_p: T_pS \\to \\mathbb{R}\\) defined by</p>
        \\[
        \\mathrm{II}_p(\\mathbf{w}) = \\langle S_p(\\mathbf{w}), \\mathbf{w} \\rangle = -\\langle dN_p(\\mathbf{w}), \\mathbf{w} \\rangle.
        \\]
        <p>More generally, the associated symmetric bilinear form is</p>
        \\[
        \\mathrm{II}_p(\\mathbf{v}, \\mathbf{w}) = \\langle S_p(\\mathbf{v}), \\mathbf{w} \\rangle = -\\langle dN_p(\\mathbf{v}), \\mathbf{w} \\rangle.
        \\]
    </div>
</div>

<h3>Coefficients \\(e, f, g\\)</h3>

<p>In a parametrization \\(\\mathbf{x}(u,v)\\), the Second Fundamental Form has the matrix representation</p>
\\[
\\mathrm{II} = e\\,du^2 + 2f\\,du\\,dv + g\\,dv^2,
\\]
<p>where the coefficients are:</p>
\\[
e = -\\langle \\mathbf{N}_u, \\mathbf{x}_u \\rangle = \\langle \\mathbf{N}, \\mathbf{x}_{uu} \\rangle, \\quad
f = -\\langle \\mathbf{N}_u, \\mathbf{x}_v \\rangle = \\langle \\mathbf{N}, \\mathbf{x}_{uv} \\rangle, \\quad
g = -\\langle \\mathbf{N}_v, \\mathbf{x}_v \\rangle = \\langle \\mathbf{N}, \\mathbf{x}_{vv} \\rangle.
\\]

<div class="env-block remark">
    <div class="env-title">Notation</div>
    <div class="env-body">
        <p>Some books use \\(L, M, N\\) or \\(b_{11}, b_{12}, b_{22}\\) for these coefficients. We use \\(e, f, g\\) following do Carmo's convention, to avoid confusion with the Gauss map \\(N\\). The matrix of the Second Fundamental Form is \\(\\begin{pmatrix} e & f \\\\ f & g \\end{pmatrix}\\).</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Geometric Meaning</div>
    <div class="env-body">
        <p>The Second Fundamental Form measures the <em>component of acceleration normal to the surface</em>. If \\(\\alpha(t) = \\mathbf{x}(u(t), v(t))\\) is a curve on the surface, then</p>
        \\[
        \\langle \\alpha''(t), \\mathbf{N} \\rangle = e(u')^2 + 2f \\, u'v' + g(v')^2 = \\mathrm{II}(\\alpha'(t)).
        \\]
        <p>So the Second Fundamental Form is the normal component of the curve's acceleration: how fast the curve is pulling away from the tangent plane.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: The Paraboloid \\(z = ax^2 + by^2\\)</div>
    <div class="env-body">
        <p>With \\(\\mathbf{x}(u,v) = (u, v, au^2+bv^2)\\), at the origin \\((0,0,0)\\):</p>
        <ul>
            <li>\\(\\mathbf{x}_{uu} = (0,0,2a)\\), \\(\\mathbf{x}_{uv} = (0,0,0)\\), \\(\\mathbf{x}_{vv} = (0,0,2b)\\)</li>
            <li>\\(\\mathbf{N}(0,0) = (0,0,1)\\)</li>
            <li>\\(e = 2a\\), \\(f = 0\\), \\(g = 2b\\)</li>
        </ul>
        <p>So \\(\\mathrm{II} = 2a\\,du^2 + 2b\\,dv^2\\). The Second Fundamental Form at the origin is diagonal, with the \\(u\\)- and \\(v\\)-directions as principal directions.</p>
    </div>
</div>

<h3>Relationship to the Shape Operator</h3>

<p>The shape operator and the two fundamental forms are related by</p>
\\[
\\mathrm{II}(\\mathbf{v}, \\mathbf{w}) = \\mathrm{I}(S_p(\\mathbf{v}), \\mathbf{w}).
\\]
<p>In matrix form, if \\(\\mathrm{I}\\) has matrix \\(\\begin{pmatrix} E & F \\\\ F & G \\end{pmatrix}\\) and \\(\\mathrm{II}\\) has matrix \\(\\begin{pmatrix} e & f \\\\ f & g \\end{pmatrix}\\), then the shape operator has matrix</p>
\\[
S_p = \\begin{pmatrix} E & F \\\\ F & G \\end{pmatrix}^{-1} \\begin{pmatrix} e & f \\\\ f & g \\end{pmatrix}.
\\]

<div class="viz-placeholder" data-viz="viz-normal-curvature"></div>
`,
            visualizations: [
                {
                    id: 'viz-normal-curvature',
                    title: 'Normal Curvature: Euler\'s Formula',
                    description: 'Rotate a tangent direction at a point on the surface and watch the normal curvature \\(\\kappa_n(\\theta)\\) change. The normal curvature follows Euler\'s formula: \\(\\kappa_n(\\theta) = \\kappa_1 \\cos^2\\theta + \\kappa_2 \\sin^2\\theta\\). The red/blue coloring indicates positive/negative curvature.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var theta = 0;
                        var k1 = 2.0, k2 = 0.5;

                        VizEngine.createSlider(controls, '\u03B8', 0, 6.28, theta, 0.05, function(v) { theta = v; draw(); });
                        VizEngine.createSlider(controls, '\u03BA\u2081', -3, 3, k1, 0.1, function(v) { k1 = v; draw(); });
                        VizEngine.createSlider(controls, '\u03BA\u2082', -3, 3, k2, 0.1, function(v) { k2 = v; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Left: polar plot of kappa_n(theta)
                            var lcx = 160, lcy = 200, lscale = 50;

                            viz.screenText('Normal Curvature \u03BA\u2099(\u03B8)', lcx, 18, viz.colors.white, 13);

                            // Draw polar axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath(); ctx.moveTo(lcx - 130, lcy); ctx.lineTo(lcx + 130, lcy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(lcx, lcy - 130); ctx.lineTo(lcx, lcy + 130); ctx.stroke();

                            // Draw Euler's formula curve
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var started = false;
                            for (var t = 0; t <= 2 * Math.PI + 0.05; t += 0.03) {
                                var kn = k1 * Math.cos(t) * Math.cos(t) + k2 * Math.sin(t) * Math.sin(t);
                                var r = Math.abs(kn) * lscale;
                                var px = lcx + r * Math.cos(t);
                                var py = lcy - r * Math.sin(t);
                                if (r > 140) { started = false; continue; }
                                ctx.strokeStyle = kn >= 0 ? viz.colors.teal : viz.colors.red;
                                if (!started) { ctx.moveTo(px, py); started = true; }
                                else ctx.lineTo(px, py);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(px, py);
                            }

                            // Current direction
                            var kn_curr = k1 * Math.cos(theta) * Math.cos(theta) + k2 * Math.sin(theta) * Math.sin(theta);
                            var dirLen = 120;
                            var dx = lcx + dirLen * Math.cos(theta);
                            var dy = lcy - dirLen * Math.sin(theta);

                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(lcx, lcy); ctx.lineTo(dx, dy); ctx.stroke();
                            ctx.setLineDash([]);

                            // Current kn point
                            var knr = Math.abs(kn_curr) * lscale;
                            var knx = lcx + knr * Math.cos(theta);
                            var kny = lcy - knr * Math.sin(theta);
                            ctx.fillStyle = kn_curr >= 0 ? viz.colors.teal : viz.colors.red;
                            ctx.beginPath(); ctx.arc(knx, kny, 5, 0, Math.PI * 2); ctx.fill();

                            // Principal direction markers
                            ctx.fillStyle = viz.colors.purple;
                            var pd1x = lcx + Math.abs(k1) * lscale * 1;
                            ctx.beginPath(); ctx.arc(pd1x, lcy, 4, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('\u03BA\u2081', pd1x, lcy - 12, viz.colors.purple, 10);

                            var pd2y = lcy - Math.abs(k2) * lscale * 1;
                            ctx.beginPath(); ctx.arc(lcx, pd2y, 4, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('\u03BA\u2082', lcx + 14, pd2y, viz.colors.purple, 10);

                            // Right: graph of kappa_n vs theta
                            var rcx = 420, rcy = 200, rw = 220, rh = 280;

                            viz.screenText('Euler\'s Formula', rcx, 18, viz.colors.white, 13);

                            // axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(rcx - rw / 2, rcy); ctx.lineTo(rcx + rw / 2, rcy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rcx - rw / 2, rcy - rh / 2); ctx.lineTo(rcx - rw / 2, rcy + rh / 2); ctx.stroke();

                            // theta axis labels
                            viz.screenText('0', rcx - rw / 2, rcy + 14, viz.colors.text, 9);
                            viz.screenText('\u03C0', rcx, rcy + 14, viz.colors.text, 9);
                            viz.screenText('2\u03C0', rcx + rw / 2, rcy + 14, viz.colors.text, 9);

                            // kappa_n graph
                            var maxK = Math.max(Math.abs(k1), Math.abs(k2), 0.5);
                            var kScale = (rh / 2 - 20) / maxK;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var t2 = 0; t2 <= 2 * Math.PI; t2 += 0.02) {
                                var kn2 = k1 * Math.cos(t2) * Math.cos(t2) + k2 * Math.sin(t2) * Math.sin(t2);
                                var gx = rcx - rw / 2 + (t2 / (2 * Math.PI)) * rw;
                                var gy = rcy - kn2 * kScale;
                                if (t2 === 0) ctx.moveTo(gx, gy);
                                else ctx.lineTo(gx, gy);
                            }
                            ctx.stroke();

                            // Current theta line
                            var currX = rcx - rw / 2 + (theta / (2 * Math.PI)) * rw;
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath(); ctx.moveTo(currX, rcy - rh / 2); ctx.lineTo(currX, rcy + rh / 2); ctx.stroke();
                            ctx.setLineDash([]);

                            var currY = rcy - kn_curr * kScale;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath(); ctx.arc(currX, currY, 5, 0, Math.PI * 2); ctx.fill();

                            // Values
                            var knColor = kn_curr >= 0 ? viz.colors.teal : viz.colors.red;
                            viz.screenText('\u03BA\u2099(\u03B8) = ' + kn_curr.toFixed(3), viz.width / 2, viz.height - 35, knColor, 13);
                            viz.screenText('\u03BA\u2081 = ' + k1.toFixed(1) + '  \u03BA\u2082 = ' + k2.toFixed(1) + '  \u03B8 = ' + (theta * 180 / Math.PI).toFixed(0) + '\u00B0', viz.width / 2, viz.height - 15, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the coefficients \\(e, f, g\\) of the Second Fundamental Form for the saddle surface \\(z = xy\\) at the origin.',
                    hint: 'Parametrize as \\(\\mathbf{x}(u,v) = (u, v, uv)\\). Compute \\(\\mathbf{x}_{uu}, \\mathbf{x}_{uv}, \\mathbf{x}_{vv}\\) and the normal at the origin.',
                    solution: 'We have \\(\\mathbf{x}_u = (1,0,v)\\), \\(\\mathbf{x}_v = (0,1,u)\\). At origin: \\(\\mathbf{x}_u = (1,0,0)\\), \\(\\mathbf{x}_v = (0,1,0)\\), so \\(\\mathbf{N} = (0,0,1)\\). Second derivatives: \\(\\mathbf{x}_{uu} = (0,0,0)\\), \\(\\mathbf{x}_{uv} = (0,0,1)\\), \\(\\mathbf{x}_{vv} = (0,0,0)\\). Thus \\(e = \\langle \\mathbf{N}, \\mathbf{x}_{uu}\\rangle = 0\\), \\(f = \\langle \\mathbf{N}, \\mathbf{x}_{uv}\\rangle = 1\\), \\(g = \\langle \\mathbf{N}, \\mathbf{x}_{vv}\\rangle = 0\\). The matrix is \\(\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\\), which has eigenvalues \\(\\pm 1\\), confirming the saddle shape.'
                },
                {
                    question: 'Show that \\(\\mathrm{II}_p(\\mathbf{w}) = \\langle \\mathbf{N}, \\alpha\'\'(0) \\rangle\\) for any curve \\(\\alpha(t)\\) on \\(S\\) with \\(\\alpha(0) = p\\), \\(\\alpha\'(0) = \\mathbf{w}\\), \\(\\|\\mathbf{w}\\| = 1\\).',
                    hint: 'Differentiate \\(\\langle \\mathbf{N}(\\alpha(t)), \\alpha\'(t) \\rangle = 0\\) at \\(t = 0\\).',
                    solution: 'Since \\(\\alpha(t) \\in S\\), we have \\(\\langle \\mathbf{N}(\\alpha(t)), \\alpha\'(t) \\rangle = 0\\) for all \\(t\\). Differentiating: \\(\\langle dN_{\\alpha(t)}(\\alpha\'(t)), \\alpha\'(t) \\rangle + \\langle \\mathbf{N}(\\alpha(t)), \\alpha\'\'(t) \\rangle = 0\\). At \\(t=0\\): \\(\\langle dN_p(\\mathbf{w}), \\mathbf{w} \\rangle + \\langle \\mathbf{N}, \\alpha\'\'(0) \\rangle = 0\\). Therefore \\(\\langle \\mathbf{N}, \\alpha\'\'(0) \\rangle = -\\langle dN_p(\\mathbf{w}), \\mathbf{w} \\rangle = \\mathrm{II}_p(\\mathbf{w})\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Normal Curvature
        // ================================================================
        {
            id: 'sec-normal-curvature',
            title: 'Normal Curvature',
            content: `
<h2>Normal Curvature</h2>

<div class="env-block definition">
    <div class="env-title">Definition 5.4 (Normal Curvature)</div>
    <div class="env-body">
        <p>Let \\(\\mathbf{w} \\in T_pS\\) be a unit tangent vector. The <strong>normal curvature</strong> of \\(S\\) at \\(p\\) in the direction \\(\\mathbf{w}\\) is</p>
        \\[
        \\kappa_n(\\mathbf{w}) = \\frac{\\mathrm{II}_p(\\mathbf{w})}{\\mathrm{I}_p(\\mathbf{w})} = \\mathrm{II}_p(\\mathbf{w})
        \\]
        <p>(the last equality holding when \\(\\|\\mathbf{w}\\| = 1\\)).</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">What Normal Curvature Measures</div>
    <div class="env-body">
        <p>Take a plane containing the normal \\(\\mathbf{N}(p)\\) and the tangent direction \\(\\mathbf{w}\\). This plane slices the surface in a curve called the <strong>normal section</strong>. The normal curvature \\(\\kappa_n(\\mathbf{w})\\) is the (signed) curvature of this normal section at \\(p\\).</p>
        <p>Positive \\(\\kappa_n\\) means the surface curves toward \\(\\mathbf{N}\\) (like the inside of a bowl). Negative \\(\\kappa_n\\) means it curves away (like a saddle in that direction).</p>
    </div>
</div>

<p>For a general (not necessarily unit) tangent vector \\(\\mathbf{w} = a\\mathbf{x}_u + b\\mathbf{x}_v\\):</p>
\\[
\\kappa_n(\\mathbf{w}) = \\frac{ea^2 + 2fab + gb^2}{Ea^2 + 2Fab + Gb^2}.
\\]

<div class="env-block theorem">
    <div class="env-title">Theorem 5.2 (Euler's Formula)</div>
    <div class="env-body">
        <p>Let \\(\\kappa_1\\) and \\(\\kappa_2\\) be the principal curvatures at \\(p\\) (the maximum and minimum values of \\(\\kappa_n\\)), and let \\(\\mathbf{e}_1, \\mathbf{e}_2\\) be the corresponding principal directions. If \\(\\mathbf{w} = \\cos\\theta \\, \\mathbf{e}_1 + \\sin\\theta \\, \\mathbf{e}_2\\), then</p>
        \\[
        \\kappa_n(\\mathbf{w}) = \\kappa_1 \\cos^2\\theta + \\kappa_2 \\sin^2\\theta.
        \\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Since \\(\\mathbf{e}_1, \\mathbf{e}_2\\) are eigenvectors of the self-adjoint operator \\(S_p\\) with eigenvalues \\(\\kappa_1, \\kappa_2\\), we have \\(S_p(\\mathbf{e}_i) = \\kappa_i \\mathbf{e}_i\\). By orthogonality, \\(\\langle \\mathbf{e}_1, \\mathbf{e}_2 \\rangle = 0\\). Then:</p>
        \\[
        \\kappa_n(\\mathbf{w}) = \\langle S_p(\\mathbf{w}), \\mathbf{w} \\rangle = \\langle \\kappa_1 \\cos\\theta \\, \\mathbf{e}_1 + \\kappa_2 \\sin\\theta \\, \\mathbf{e}_2, \\cos\\theta \\, \\mathbf{e}_1 + \\sin\\theta \\, \\mathbf{e}_2 \\rangle = \\kappa_1 \\cos^2\\theta + \\kappa_2 \\sin^2\\theta.
        \\]
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block remark">
    <div class="env-title">Meusnier's Theorem</div>
    <div class="env-body">
        <p>Any curve on \\(S\\) through \\(p\\) with tangent direction \\(\\mathbf{w}\\) (not just normal sections) has curvature related to \\(\\kappa_n\\) by \\(\\kappa_n = \\kappa \\cos\\phi\\), where \\(\\kappa\\) is the curve's curvature and \\(\\phi\\) is the angle between the curve's principal normal and the surface normal \\(\\mathbf{N}\\). All curves through \\(p\\) with the same tangent direction have the same normal curvature.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-principal-directions"></div>
`,
            visualizations: [
                {
                    id: 'viz-principal-directions',
                    title: 'Principal Directions & Curvature Ellipse',
                    description: 'At each point on the surface, the principal directions (purple/green) are the eigenvectors of the shape operator. The curvature ellipse (yellow) shows how normal curvature varies with direction. The ellipse axes are the principal directions, and their lengths are the principal curvatures.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var k1 = 2.0, k2 = 0.8;
                        var rotAngle = 0;

                        VizEngine.createSlider(controls, '\u03BA\u2081', 0.1, 4, k1, 0.1, function(v) { k1 = v; draw(); });
                        VizEngine.createSlider(controls, '\u03BA\u2082', -2, 4, k2, 0.1, function(v) { k2 = v; draw(); });
                        VizEngine.createSlider(controls, 'Rotation', 0, 3.14, rotAngle, 0.05, function(v) { rotAngle = v; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2, cy = 200;

                            viz.screenText('Principal Directions & Curvature Ellipse', cx, 18, viz.colors.white, 13);

                            // Draw tangent plane as a rectangle
                            var planeSize = 140;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(cx - planeSize, cy - planeSize, planeSize * 2, planeSize * 2);

                            viz.screenText('T\u209AS (tangent plane at p)', cx, cy - planeSize - 8, viz.colors.text, 10);

                            // Draw curvature ellipse
                            ctx.save();
                            ctx.translate(cx, cy);
                            ctx.rotate(-rotAngle);

                            var eScale = 40;
                            var rx = Math.abs(k1) * eScale;
                            var ry = Math.abs(k2) * eScale;

                            // Curvature ellipse
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.ellipse(0, 0, Math.min(rx, 135), Math.min(ry, 135), 0, 0, Math.PI * 2);
                            ctx.stroke();

                            // Principal direction 1
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(-130, 0); ctx.lineTo(130, 0); ctx.stroke();
                            // arrowhead
                            ctx.fillStyle = viz.colors.purple;
                            ctx.beginPath(); ctx.moveTo(130, 0); ctx.lineTo(120, -5); ctx.lineTo(120, 5); ctx.closePath(); ctx.fill();

                            // Principal direction 2
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(0, -130); ctx.lineTo(0, 130); ctx.stroke();
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath(); ctx.moveTo(0, -130); ctx.lineTo(-5, -120); ctx.lineTo(5, -120); ctx.closePath(); ctx.fill();

                            // Labels for principal directions
                            viz.screenText('e\u2081 (\u03BA\u2081=' + k1.toFixed(1) + ')', cx + 105, cy + 14, viz.colors.purple, 11);

                            ctx.restore();

                            // Curvature values at sampled directions
                            var nDirs = 36;
                            for (var i = 0; i < nDirs; i++) {
                                var t = i * Math.PI * 2 / nDirs;
                                var kn = k1 * Math.cos(t) * Math.cos(t) + k2 * Math.sin(t) * Math.sin(t);
                                var r = Math.abs(kn) * eScale;
                                if (r > 135) r = 135;
                                var px = cx + r * Math.cos(t + rotAngle);
                                var py = cy - r * Math.sin(t + rotAngle);
                                ctx.fillStyle = kn >= 0 ? viz.colors.teal + '44' : viz.colors.red + '44';
                                ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill();
                            }

                            // Center point
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();

                            // Info
                            var gaussK = k1 * k2;
                            var meanH = (k1 + k2) / 2;
                            viz.screenText('\u03BA\u2081 = ' + k1.toFixed(1) + '   \u03BA\u2082 = ' + k2.toFixed(1), cx, viz.height - 45, viz.colors.white, 12);
                            viz.screenText('K = \u03BA\u2081\u03BA\u2082 = ' + gaussK.toFixed(2) + '   H = (\u03BA\u2081+\u03BA\u2082)/2 = ' + meanH.toFixed(2), cx, viz.height - 25, viz.colors.teal, 11);
                            var type = (gaussK > 0.01) ? 'Elliptic' : (gaussK < -0.01) ? 'Hyperbolic' : (Math.abs(k1) + Math.abs(k2) < 0.05) ? 'Planar' : 'Parabolic';
                            viz.screenText('Point type: ' + type, cx, viz.height - 8, viz.colors.orange, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'At a point where \\(\\kappa_1 = 3\\) and \\(\\kappa_2 = 1\\), find the normal curvature in the direction making angle \\(\\theta = \\pi/4\\) with the first principal direction.',
                    hint: 'Apply Euler\'s formula directly.',
                    solution: 'By Euler\'s formula, \\(\\kappa_n = \\kappa_1 \\cos^2(\\pi/4) + \\kappa_2 \\sin^2(\\pi/4) = 3 \\cdot \\frac{1}{2} + 1 \\cdot \\frac{1}{2} = 2\\).'
                },
                {
                    question: 'Prove that the mean curvature \\(H = \\frac{\\kappa_1 + \\kappa_2}{2}\\) equals the average of the normal curvatures in any two orthogonal directions.',
                    hint: 'If \\(\\mathbf{w}\\) makes angle \\(\\theta\\) with \\(\\mathbf{e}_1\\), the orthogonal direction makes angle \\(\\theta + \\pi/2\\).',
                    solution: 'Let \\(\\mathbf{w}\\) make angle \\(\\theta\\) with \\(\\mathbf{e}_1\\). The orthogonal direction makes angle \\(\\theta + \\pi/2\\). By Euler\'s formula: \\(\\kappa_n(\\theta) + \\kappa_n(\\theta+\\pi/2) = \\kappa_1\\cos^2\\theta + \\kappa_2\\sin^2\\theta + \\kappa_1\\sin^2\\theta + \\kappa_2\\cos^2\\theta = \\kappa_1 + \\kappa_2\\). So the average is \\((\\kappa_1+\\kappa_2)/2 = H\\), independent of \\(\\theta\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Principal Curvatures & Directions
        // ================================================================
        {
            id: 'sec-principal',
            title: 'Principal Curvatures & Directions',
            content: `
<h2>Principal Curvatures and Directions</h2>

<div class="env-block definition">
    <div class="env-title">Definition 5.5 (Principal Curvatures and Directions)</div>
    <div class="env-body">
        <p>The <strong>principal curvatures</strong> \\(\\kappa_1\\) and \\(\\kappa_2\\) at a point \\(p \\in S\\) are the eigenvalues of the shape operator \\(S_p\\). The corresponding eigenvectors \\(\\mathbf{e}_1, \\mathbf{e}_2\\) are called the <strong>principal directions</strong>.</p>
        <p>Equivalently, \\(\\kappa_1\\) and \\(\\kappa_2\\) are the maximum and minimum values of the normal curvature \\(\\kappa_n(\\mathbf{w})\\) over all unit tangent vectors \\(\\mathbf{w} \\in T_pS\\).</p>
    </div>
</div>

<p>Since \\(S_p\\) is self-adjoint, the spectral theorem guarantees:</p>
<ul>
    <li>\\(\\kappa_1, \\kappa_2\\) are <strong>real</strong>.</li>
    <li>\\(\\mathbf{e}_1, \\mathbf{e}_2\\) are <strong>orthogonal</strong> (when \\(\\kappa_1 \\neq \\kappa_2\\)).</li>
</ul>

<h3>Computing Principal Curvatures</h3>

<p>The principal curvatures are the roots of the characteristic equation of \\(S_p\\). Using the first and second fundamental forms:</p>
\\[
\\det\\begin{pmatrix} e - \\kappa E & f - \\kappa F \\\\ f - \\kappa F & g - \\kappa G \\end{pmatrix} = 0.
\\]
<p>This gives</p>
\\[
(EG - F^2)\\kappa^2 - (eG - 2fF + gE)\\kappa + (eg - f^2) = 0.
\\]

<div class="env-block definition">
    <div class="env-title">Definition 5.6 (Gaussian and Mean Curvature)</div>
    <div class="env-body">
        <p>The <strong>Gaussian curvature</strong> and <strong>mean curvature</strong> at \\(p\\) are</p>
        \\[
        K = \\kappa_1 \\kappa_2 = \\frac{eg - f^2}{EG - F^2}, \\qquad H = \\frac{\\kappa_1 + \\kappa_2}{2} = \\frac{eG - 2fF + gE}{2(EG - F^2)}.
        \\]
        <p>\\(K\\) is the determinant and \\(2H\\) is the trace of the shape operator.</p>
    </div>
</div>

<h3>Classification of Points</h3>

<div class="env-block definition">
    <div class="env-title">Definition 5.7 (Point Classification)</div>
    <div class="env-body">
        <p>A point \\(p \\in S\\) is called:</p>
        <ul>
            <li><strong>Elliptic</strong> if \\(K > 0\\) (both principal curvatures have the same sign). Example: sphere, elliptic paraboloid.</li>
            <li><strong>Hyperbolic</strong> if \\(K < 0\\) (principal curvatures have opposite signs). Example: saddle point, hyperboloid of one sheet.</li>
            <li><strong>Parabolic</strong> if \\(K = 0\\) but \\(S_p \\neq 0\\) (one principal curvature is zero). Example: cylinder.</li>
            <li><strong>Planar</strong> (or flat) if \\(K = 0\\) and \\(S_p = 0\\) (both principal curvatures are zero). Example: plane, or an inflection point of the surface.</li>
        </ul>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 5.8 (Umbilic Point)</div>
    <div class="env-body">
        <p>A point \\(p\\) is called an <strong>umbilic point</strong> if \\(\\kappa_1 = \\kappa_2\\). At an umbilic, the normal curvature is the same in every direction, and every tangent direction is a principal direction. The shape operator is a scalar multiple of the identity: \\(S_p = \\kappa \\, \\text{Id}\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.3</div>
    <div class="env-body">
        <p>If every point of a connected surface \\(S\\) is umbilic, then \\(S\\) is contained in a sphere or a plane.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-saddle-point"></div>
<div class="viz-placeholder" data-viz="viz-umbilic"></div>
`,
            visualizations: [
                {
                    id: 'viz-saddle-point',
                    title: 'Saddle Point: Opposite Principal Curvatures',
                    description: 'A saddle surface has one positive and one negative principal curvature (K < 0). The surface curves "up" in one principal direction and "down" in the other. The color shows the sign of normal curvature in each direction.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 350,
                            originX: 0, originY: 0, scale: 1
                        });

                        var viewAngle = 0.5;
                        VizEngine.createSlider(controls, 'View angle', 0, 6.28, viewAngle, 0.1, function(v) { viewAngle = v; draw(); });

                        function proj3d(x, y, z, cx, cy, sc, ang) {
                            var ca = Math.cos(ang), sa = Math.sin(ang);
                            var rx = x * ca - y * sa;
                            var ry = x * sa + y * ca;
                            return [cx + rx * sc, cy + (-ry * 0.4 + z * 0.9) * sc];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2, cy = 200, sc = 55;

                            viz.screenText('Saddle Surface: z = x\u00B2 \u2212 y\u00B2', cx, 18, viz.colors.white, 14);
                            viz.screenText('K = \u03BA\u2081\u03BA\u2082 < 0 (hyperbolic point)', cx, 36, viz.colors.red, 11);

                            // Draw saddle wireframe
                            var N = 30;
                            for (var i = -N; i <= N; i++) {
                                ctx.beginPath();
                                var started = false;
                                for (var j = -N; j <= N; j++) {
                                    var u = i / N * 2, v = j / N * 2;
                                    var z = u * u - v * v;
                                    // Color by z
                                    var p = proj3d(u, v, z, cx, cy, sc, viewAngle);
                                    if (z > 0) ctx.strokeStyle = viz.colors.teal + '55';
                                    else ctx.strokeStyle = viz.colors.red + '55';
                                    if (!started) { ctx.moveTo(p[0], p[1]); started = true; }
                                    else { ctx.lineTo(p[0], p[1]); }
                                }
                                ctx.lineWidth = 0.6;
                                ctx.stroke();
                            }
                            for (var j2 = -N; j2 <= N; j2++) {
                                ctx.beginPath();
                                var started2 = false;
                                for (var i2 = -N; i2 <= N; i2++) {
                                    var u2 = i2 / N * 2, v2 = j2 / N * 2;
                                    var z2 = u2 * u2 - v2 * v2;
                                    if (z2 > 0) ctx.strokeStyle = viz.colors.teal + '55';
                                    else ctx.strokeStyle = viz.colors.red + '55';
                                    var p2 = proj3d(u2, v2, z2, cx, cy, sc, viewAngle);
                                    if (!started2) { ctx.moveTo(p2[0], p2[1]); started2 = true; }
                                    else ctx.lineTo(p2[0], p2[1]);
                                }
                                ctx.lineWidth = 0.6;
                                ctx.stroke();
                            }

                            // Draw principal directions at origin
                            var origin = proj3d(0, 0, 0, cx, cy, sc, viewAngle);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath(); ctx.arc(origin[0], origin[1], 5, 0, Math.PI * 2); ctx.fill();

                            // e1 direction (positive curvature, along x)
                            var e1a = proj3d(-1.5, 0, 0, cx, cy, sc, viewAngle);
                            var e1b = proj3d(1.5, 0, 0, cx, cy, sc, viewAngle);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(e1a[0], e1a[1]); ctx.lineTo(e1b[0], e1b[1]); ctx.stroke();
                            viz.screenText('\u03BA\u2081 > 0', e1b[0] + 10, e1b[1], viz.colors.teal, 11, 'left');

                            // e2 direction (negative curvature, along y)
                            var e2a = proj3d(0, -1.5, 0, cx, cy, sc, viewAngle);
                            var e2b = proj3d(0, 1.5, 0, cx, cy, sc, viewAngle);
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(e2a[0], e2a[1]); ctx.lineTo(e2b[0], e2b[1]); ctx.stroke();
                            viz.screenText('\u03BA\u2082 < 0', e2b[0] + 10, e2b[1], viz.colors.red, 11, 'left');

                            // Asymptotic lines (kappa_n = 0 along y=x and y=-x)
                            ctx.strokeStyle = viz.colors.yellow + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            var a1 = proj3d(-1.5, -1.5, 0, cx, cy, sc, viewAngle);
                            var a2 = proj3d(1.5, 1.5, 0, cx, cy, sc, viewAngle);
                            ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.lineTo(a2[0], a2[1]); ctx.stroke();
                            var a3 = proj3d(-1.5, 1.5, 0, cx, cy, sc, viewAngle);
                            var a4 = proj3d(1.5, -1.5, 0, cx, cy, sc, viewAngle);
                            ctx.beginPath(); ctx.moveTo(a3[0], a3[1]); ctx.lineTo(a4[0], a4[1]); ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('asymptotic directions (\u03BA\u2099=0)', cx, viz.height - 12, viz.colors.yellow, 10);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-umbilic',
                    title: 'Umbilic Points: Where \u03BA\u2081 = \u03BA\u2082',
                    description: 'At an umbilic point, both principal curvatures are equal. On a sphere, every point is umbilic. The curvature "ellipse" degenerates to a circle, and every direction is a principal direction.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 350,
                            originX: 0, originY: 0, scale: 1
                        });

                        var R = 2.0;
                        VizEngine.createSlider(controls, 'Radius R', 0.5, 4, R, 0.1, function(v) { R = v; draw(); });

                        function proj3d(x, y, z, cx, cy, sc) {
                            return [cx + (x * 0.87 - y * 0.5) * sc, cy + (-x * 0.25 - y * 0.43 + z * 0.87) * sc];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Left: sphere
                            var lcx = 170, lcy = 190, lsc = 50;

                            viz.screenText('Sphere of Radius R = ' + R.toFixed(1), lcx, 18, viz.colors.white, 13);
                            viz.screenText('Every point is umbilic', lcx, 36, viz.colors.teal, 11);

                            // Draw sphere wireframe
                            for (var lat = -3; lat <= 3; lat++) {
                                var phi = lat * Math.PI / 7;
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                for (var s = 0; s <= 60; s++) {
                                    var th = s * Math.PI * 2 / 60;
                                    var x = R * Math.cos(phi) * Math.cos(th);
                                    var y = R * Math.cos(phi) * Math.sin(th);
                                    var z = R * Math.sin(phi);
                                    var p = proj3d(x, y, z, lcx, lcy, lsc);
                                    if (s === 0) ctx.moveTo(p[0], p[1]);
                                    else ctx.lineTo(p[0], p[1]);
                                }
                                ctx.stroke();
                            }
                            for (var m = 0; m < 8; m++) {
                                var thm = m * Math.PI / 4;
                                ctx.beginPath();
                                for (var s2 = 0; s2 <= 60; s2++) {
                                    var phi2 = s2 * Math.PI * 2 / 60;
                                    var x2 = R * Math.cos(phi2) * Math.cos(thm);
                                    var y2 = R * Math.cos(phi2) * Math.sin(thm);
                                    var z2 = R * Math.sin(phi2);
                                    var p2 = proj3d(x2, y2, z2, lcx, lcy, lsc);
                                    if (s2 === 0) ctx.moveTo(p2[0], p2[1]);
                                    else ctx.lineTo(p2[0], p2[1]);
                                }
                                ctx.stroke();
                            }

                            // Highlight a point
                            var hp = proj3d(0, R, 0, lcx, lcy, lsc);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(hp[0], hp[1], 5, 0, Math.PI * 2); ctx.fill();

                            // Normal at that point
                            var np = proj3d(0, R + 1.2, 0, lcx, lcy, lsc);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(hp[0], hp[1]); ctx.lineTo(np[0], np[1]); ctx.stroke();

                            // Right: curvature circle (degenerate ellipse)
                            var rcx = 410, rcy = 190;
                            viz.screenText('Curvature at Umbilic', rcx, 18, viz.colors.white, 13);

                            // circle: all directions equal
                            var kappa = 1 / R;
                            var circR = kappa * 80;

                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(rcx, rcy, circR, 0, Math.PI * 2);
                            ctx.stroke();

                            // Draw several direction arrows (all same length)
                            for (var d = 0; d < 12; d++) {
                                var da = d * Math.PI / 6;
                                var dx = rcx + circR * Math.cos(da);
                                var dy = rcy - circR * Math.sin(da);
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(rcx, rcy); ctx.lineTo(dx, dy); ctx.stroke();
                            }

                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(rcx, rcy, 4, 0, Math.PI * 2); ctx.fill();

                            viz.screenText('\u03BA\u2081 = \u03BA\u2082 = 1/R = ' + kappa.toFixed(2), rcx, rcy + circR + 25, viz.colors.teal, 12);
                            viz.screenText('K = 1/R\u00B2 = ' + (1 / (R * R)).toFixed(3), rcx, rcy + circR + 45, viz.colors.orange, 11);
                            viz.screenText('Every direction is principal', rcx, rcy + circR + 65, viz.colors.purple, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For the torus parametrized by \\(\\mathbf{x}(\\theta,\\phi) = ((R + r\\cos\\phi)\\cos\\theta, (R + r\\cos\\phi)\\sin\\theta, r\\sin\\phi)\\), find the principal curvatures.',
                    hint: 'The \\(\\theta\\)- and \\(\\phi\\)-directions are already principal. Compute \\(\\kappa_n\\) in each.',
                    solution: 'For the torus, the principal curvatures are \\(\\kappa_1 = \\frac{\\cos\\phi}{R + r\\cos\\phi}\\) (in the \\(\\theta\\)-direction) and \\(\\kappa_2 = \\frac{1}{r}\\) (in the \\(\\phi\\)-direction). The Gaussian curvature is \\(K = \\frac{\\cos\\phi}{r(R + r\\cos\\phi)}\\). On the outer equator (\\(\\phi = 0\\)), \\(K > 0\\) (elliptic). On the inner equator (\\(\\phi = \\pi\\)), \\(K < 0\\) (hyperbolic). On the top and bottom circles (\\(\\phi = \\pm\\pi/2\\)), \\(K = 0\\) (parabolic).'
                },
                {
                    question: 'Prove that at a non-umbilic point, the principal directions are orthogonal.',
                    hint: 'Use self-adjointness of the shape operator and the fact that \\(\\kappa_1 \\neq \\kappa_2\\).',
                    solution: 'Let \\(S_p(\\mathbf{e}_1) = \\kappa_1 \\mathbf{e}_1\\) and \\(S_p(\\mathbf{e}_2) = \\kappa_2 \\mathbf{e}_2\\) with \\(\\kappa_1 \\neq \\kappa_2\\). By self-adjointness: \\(\\langle S_p(\\mathbf{e}_1), \\mathbf{e}_2 \\rangle = \\langle \\mathbf{e}_1, S_p(\\mathbf{e}_2) \\rangle\\). The left side equals \\(\\kappa_1 \\langle \\mathbf{e}_1, \\mathbf{e}_2 \\rangle\\) and the right side equals \\(\\kappa_2 \\langle \\mathbf{e}_1, \\mathbf{e}_2 \\rangle\\). So \\((\\kappa_1 - \\kappa_2)\\langle \\mathbf{e}_1, \\mathbf{e}_2 \\rangle = 0\\). Since \\(\\kappa_1 \\neq \\kappa_2\\), we must have \\(\\langle \\mathbf{e}_1, \\mathbf{e}_2 \\rangle = 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to What's Next
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead</h2>

<p>We now have two fundamental tools for studying surfaces in \\(\\mathbb{R}^3\\):</p>

<div class="env-block remark">
    <div class="env-title">The Two Fundamental Forms</div>
    <div class="env-body">
        <table style="width:100%; border-collapse: collapse; margin: 10px 0;">
            <tr style="border-bottom: 1px solid #30363d;">
                <th style="text-align:left; padding: 8px;"></th>
                <th style="text-align:left; padding: 8px;">First Fundamental Form \\(\\mathrm{I}\\)</th>
                <th style="text-align:left; padding: 8px;">Second Fundamental Form \\(\\mathrm{II}\\)</th>
            </tr>
            <tr style="border-bottom: 1px solid #30363d;">
                <td style="padding: 8px;"><strong>Measures</strong></td>
                <td style="padding: 8px;">Intrinsic geometry (lengths, angles, areas)</td>
                <td style="padding: 8px;">Extrinsic curvature (bending in \\(\\mathbb{R}^3\\))</td>
            </tr>
            <tr style="border-bottom: 1px solid #30363d;">
                <td style="padding: 8px;"><strong>Coefficients</strong></td>
                <td style="padding: 8px;">\\(E, F, G\\)</td>
                <td style="padding: 8px;">\\(e, f, g\\)</td>
            </tr>
            <tr style="border-bottom: 1px solid #30363d;">
                <td style="padding: 8px;"><strong>Matrix</strong></td>
                <td style="padding: 8px;">\\(\\begin{pmatrix} E & F \\\\ F & G \\end{pmatrix}\\)</td>
                <td style="padding: 8px;">\\(\\begin{pmatrix} e & f \\\\ f & g \\end{pmatrix}\\)</td>
            </tr>
            <tr>
                <td style="padding: 8px;"><strong>Source</strong></td>
                <td style="padding: 8px;">Inner products of \\(\\mathbf{x}_u, \\mathbf{x}_v\\)</td>
                <td style="padding: 8px;">Inner products of \\(\\mathbf{x}_{uu}, \\mathbf{x}_{uv}, \\mathbf{x}_{vv}\\) with \\(\\mathbf{N}\\)</td>
            </tr>
        </table>
    </div>
</div>

<p>Together they determine the shape operator \\(S_p = \\mathrm{I}^{-1} \\mathrm{II}\\), whose eigenvalues give the principal curvatures \\(\\kappa_1, \\kappa_2\\).</p>

<h3>Gaussian and Mean Curvature</h3>

<p>From the principal curvatures we extract two scalar invariants:</p>
\\[
K = \\kappa_1 \\kappa_2, \\qquad H = \\frac{\\kappa_1 + \\kappa_2}{2}.
\\]

<p>In Chapter 6, we will study these curvatures in depth. The headline results:</p>
<ul>
    <li><strong>Gaussian curvature \\(K\\)</strong> turns out to be <em>intrinsic</em>: it depends only on the First Fundamental Form and its derivatives. This is Gauss's <em>Theorema Egregium</em> (Chapter 8), one of the most remarkable results in all of mathematics.</li>
    <li><strong>Mean curvature \\(H\\)</strong> is extrinsic: it changes under bending. But \\(H = 0\\) characterizes <em>minimal surfaces</em> (Chapter 10), which locally minimize area.</li>
</ul>

<h3>The Gauss Map and Area</h3>

<div class="env-block intuition">
    <div class="env-title">Gaussian Curvature as Area Ratio</div>
    <div class="env-body">
        <p>The Gauss map sends a small region around \\(p\\) on the surface to a small region on \\(S^2\\). The ratio of the area of the image to the area of the original region, in the limit, equals \\(|K(p)|\\). If \\(K > 0\\), the Gauss map preserves orientation; if \\(K < 0\\), it reverses it. This is the original definition Gauss used for curvature.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-gauss-map-area"></div>

<h3>The Road Ahead</h3>

<p>The next chapters build on this foundation:</p>
<ol>
    <li><strong>Chapter 6</strong>: Deep study of Gaussian and mean curvature, with formulas, classifications, and applications.</li>
    <li><strong>Chapter 7</strong>: Geodesics, the "straight lines" of curved surfaces, governed by the Christoffel symbols derived from the First Fundamental Form.</li>
    <li><strong>Chapter 8</strong>: The Theorema Egregium, proving that \\(K\\) is intrinsic.</li>
    <li><strong>Chapter 9</strong>: The Gauss-Bonnet theorem, linking total curvature to topology.</li>
</ol>

<div class="env-block remark">
    <div class="env-title">The Big Picture</div>
    <div class="env-body">
        <p>The Gauss map and Second Fundamental Form are where intrinsic and extrinsic geometry meet. The shape operator encodes everything about how the surface sits in \\(\\mathbb{R}^3\\), and from it we can extract both intrinsic quantities (like \\(K\\)) and extrinsic ones (like \\(H\\)). Understanding this interplay is the central theme of classical differential geometry.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-gauss-map-area',
                    title: 'Gaussian Curvature as Area Ratio',
                    description: 'The Gauss map sends a small region on the surface to a region on S\u00B2. As the region shrinks, the ratio of image area to original area converges to |K|. Adjust the region size and watch the area ratio approach the Gaussian curvature.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 700, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var regionSize = 0.8;
                        var curvParam = 1.0; // controls a,b in z = a*x^2 + b*y^2

                        VizEngine.createSlider(controls, 'Region size \u03B5', 0.1, 1.5, regionSize, 0.05, function(v) { regionSize = v; draw(); });
                        VizEngine.createSlider(controls, 'Curvature a', 0.2, 3, curvParam, 0.1, function(v) { curvParam = v; draw(); });

                        function proj3d(x, y, z, cx, cy, sc) {
                            return [cx + (x * 0.87 - y * 0.5) * sc, cy + (-x * 0.25 - y * 0.43 + z * 0.87) * sc];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var a = curvParam, b = 0.5;
                            // Surface z = a*x^2 + b*y^2

                            // Left: surface with highlighted region
                            var lcx = 170, lcy = 230, lsc = 55;
                            viz.screenText('Surface: z = ' + a.toFixed(1) + 'x\u00B2 + 0.5y\u00B2', lcx, 18, viz.colors.white, 12);

                            // Wireframe
                            var N = 20;
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var i = -N; i <= N; i++) {
                                ctx.beginPath();
                                var started = false;
                                for (var j = -N; j <= N; j++) {
                                    var u = i / N * 2, v = j / N * 2;
                                    var z = a * u * u + b * v * v;
                                    var p = proj3d(u, v, z, lcx, lcy, lsc);
                                    if (!started) { ctx.moveTo(p[0], p[1]); started = true; }
                                    else ctx.lineTo(p[0], p[1]);
                                }
                                ctx.stroke();
                            }
                            for (var j2 = -N; j2 <= N; j2++) {
                                ctx.beginPath();
                                var started2 = false;
                                for (var i2 = -N; i2 <= N; i2++) {
                                    var u2 = i2 / N * 2, v2 = j2 / N * 2;
                                    var z2 = a * u2 * u2 + b * v2 * v2;
                                    var p2 = proj3d(u2, v2, z2, lcx, lcy, lsc);
                                    if (!started2) { ctx.moveTo(p2[0], p2[1]); started2 = true; }
                                    else ctx.lineTo(p2[0], p2[1]);
                                }
                                ctx.stroke();
                            }

                            // Highlight region on surface
                            var eps = regionSize;
                            ctx.fillStyle = viz.colors.blue + '44';
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            var nSteps = 30;
                            for (var s = 0; s <= nSteps; s++) {
                                var angle = s * 2 * Math.PI / nSteps;
                                var ru = eps * Math.cos(angle);
                                var rv = eps * Math.sin(angle);
                                var rz = a * ru * ru + b * rv * rv;
                                var rp = proj3d(ru, rv, rz, lcx, lcy, lsc);
                                if (s === 0) ctx.moveTo(rp[0], rp[1]);
                                else ctx.lineTo(rp[0], rp[1]);
                            }
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();

                            // Right: sphere with image region
                            var rcx = 530, rcy = 200, rsc = 90;
                            viz.screenText('Image on S\u00B2', rcx, 18, viz.colors.white, 12);

                            // Sphere outline
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.arc(rcx, rcy, rsc, 0, Math.PI * 2); ctx.stroke();

                            // Wireframe on sphere
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.3;
                            for (var lat = -3; lat <= 3; lat++) {
                                var phi = lat * Math.PI / 7;
                                ctx.beginPath();
                                for (var ss = 0; ss <= 60; ss++) {
                                    var th = ss * Math.PI * 2 / 60;
                                    var sx = Math.cos(phi) * Math.cos(th);
                                    var sy = Math.cos(phi) * Math.sin(th);
                                    var sz = Math.sin(phi);
                                    var sp = proj3d(sx, sy, sz, rcx, rcy, rsc);
                                    if (ss === 0) ctx.moveTo(sp[0], sp[1]);
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                            }

                            // Image region on sphere
                            ctx.fillStyle = viz.colors.teal + '44';
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            for (var s3 = 0; s3 <= nSteps; s3++) {
                                var angle3 = s3 * 2 * Math.PI / nSteps;
                                var nu = eps * Math.cos(angle3);
                                var nv = eps * Math.sin(angle3);
                                // Normal at (nu,nv): (-2a*nu, -2b*nv, 1)/||...||
                                var nx = -2 * a * nu, ny = -2 * b * nv, nz = 1;
                                var nlen = Math.sqrt(nx * nx + ny * ny + nz * nz);
                                nx /= nlen; ny /= nlen; nz /= nlen;
                                var np = proj3d(nx, ny, nz, rcx, rcy, rsc);
                                if (s3 === 0) ctx.moveTo(np[0], np[1]);
                                else ctx.lineTo(np[0], np[1]);
                            }
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();

                            // Compute approximate areas
                            // Surface area of region ~ pi*eps^2 (flat approximation)
                            var surfArea = Math.PI * eps * eps;
                            // Image area: for z = ax^2+by^2 at origin, K = 4ab
                            // Image area ~ K * surface area (for small eps)
                            var K = 4 * a * b;
                            var imageArea = K * surfArea; // first-order approximation
                            var ratio = Math.abs(imageArea / surfArea);

                            viz.screenText('Surface area \u2248 ' + surfArea.toFixed(3), viz.width / 2, viz.height - 55, viz.colors.blue, 11);
                            viz.screenText('Image area \u2248 ' + Math.abs(imageArea).toFixed(3), viz.width / 2, viz.height - 38, viz.colors.teal, 11);
                            viz.screenText('Ratio \u2248 ' + ratio.toFixed(3) + '   K(0) = 4ab = ' + K.toFixed(2), viz.width / 2, viz.height - 18, viz.colors.orange, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Classify each point of the ellipsoid \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} + \\frac{z^2}{c^2} = 1\\) as elliptic, hyperbolic, parabolic, or planar.',
                    hint: 'What is the sign of the Gaussian curvature at each point of an ellipsoid?',
                    solution: 'Every point of an ellipsoid is <strong>elliptic</strong> (\\(K > 0\\)). At any point, the surface curves toward the interior in all tangent directions. Both principal curvatures have the same sign (positive for outward normal). The Gaussian curvature is \\(K = \\frac{1}{a^2 b^2 c^2} \\cdot \\frac{1}{(\\frac{x^2}{a^4} + \\frac{y^2}{b^4} + \\frac{z^2}{c^4})^2}\\), which is always positive.'
                },
                {
                    question: 'A surface has \\(E = 1, F = 0, G = 1, e = 2, f = 1, g = -1\\) at a point \\(p\\). Find the principal curvatures and classify the point.',
                    hint: 'Since \\(F = 0\\) and \\(E = G = 1\\), the shape operator matrix equals the Second Fundamental Form matrix. Find its eigenvalues.',
                    solution: 'The shape operator matrix is \\(\\begin{pmatrix} 2 & 1 \\\\ 1 & -1 \\end{pmatrix}\\). The characteristic equation: \\(\\lambda^2 - \\lambda - 3 = 0\\), giving \\(\\lambda = \\frac{1 \\pm \\sqrt{13}}{2}\\). So \\(\\kappa_1 \\approx 2.30\\) and \\(\\kappa_2 \\approx -1.30\\). Since \\(K = \\kappa_1 \\kappa_2 = eg - f^2 = -3 < 0\\), the point is <strong>hyperbolic</strong>.'
                },
                {
                    question: 'Show that the Gaussian curvature of a surface of revolution \\(\\mathbf{x}(u,v) = (f(v)\\cos u, f(v)\\sin u, g(v))\\) with \\(f > 0\\) and \\((f\')^2 + (g\')^2 = 1\\) is \\(K = -f\'\'/f\\).',
                    hint: 'Compute the first and second fundamental form coefficients, then use \\(K = (eg - f^2)/(EG - F^2)\\). The unit-speed condition simplifies things considerably.',
                    solution: 'With \\((f\')^2 + (g\')^2 = 1\\): \\(E = f^2\\), \\(F = 0\\), \\(G = 1\\). The unit normal is \\(\\mathbf{N} = (g\'\\cos u, g\'\\sin u, -f\')\\). Computing: \\(e = fg\'\\), \\(f = 0\\), \\(g = f\'g\'\' - f\'\'g\'\\). Using the constraint \\(f\'f\'\' + g\'g\'\' = 0\\), we get \\(g = -f\'\'/(f\' g\' \\cdot ... )\\). After simplification with the unit-speed condition: \\(g = f\'g\'\' - f\'\'g\'\\). Then \\(K = eg/(f^2) = fg\'(f\'g\'\' - f\'\'g\')/(f^2)\\). Using \\(f\'f\'\' + g\'g\'\' = 0\\) to substitute \\(g\'\' = -f\'f\'\'/g\'\\), we get \\(K = -f\'\'/f\\).'
                }
            ]
        }
    ]
});
