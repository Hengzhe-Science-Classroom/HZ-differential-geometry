window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch08',
    number: 8,
    title: "Gauss's Theorema Egregium",
    subtitle: "Gaussian curvature is intrinsic: Gauss's remarkable theorem",
    sections: [
        // ================================================================
        // SECTION 1: The Most Beautiful Theorem
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'The Most Beautiful Theorem',
            content: `
<h2>The Most Beautiful Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">Why This Theorem Matters</div>
    <div class="env-body">
        <p>Imagine you are a two-dimensional being living on a surface. You can measure distances along the surface, compute areas of regions, and observe how geodesics behave, but you cannot "look out" into the ambient three-dimensional space. Can you detect whether your world is curved?</p>
        <p>Gauss's <em>Theorema Egregium</em> ("remarkable theorem") answers with a resounding <strong>yes</strong>. Gaussian curvature \\(K\\) can be computed entirely from measurements made within the surface itself, without any reference to how the surface sits in \\(\\mathbb{R}^3\\). This is one of the most profound results in all of geometry.</p>
    </div>
</div>

<p>In Chapters 5 and 6, we defined Gaussian curvature \\(K = \\kappa_1 \\kappa_2\\) as the product of the principal curvatures. These principal curvatures measure how the surface bends <em>in ambient space</em>: they depend on the Gauss map \\(N: S \\to S^2\\) and the shape operator \\(dN_p\\). At first glance, \\(K\\) seems to be an <strong>extrinsic</strong> quantity, one that requires knowledge of the embedding.</p>

<p>Gauss discovered, to his own astonishment, that \\(K\\) depends only on the <strong>first fundamental form</strong> (the metric) and its derivatives. In other words, \\(K\\) is an <strong>intrinsic</strong> invariant: it can be determined by a geometer who lives on the surface and can only measure lengths and angles within it.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Gauss published this result in his 1827 <em>Disquisitiones generales circa superficies curvas</em>. He called it "egregium" (remarkable) because even he found it surprising. The theorem emerged from his work on geodetic surveying of the Kingdom of Hanover, where practical mapmaking problems led to deep theoretical insights.</p>
    </div>
</div>

<h3>The Road Ahead</h3>

<p>This chapter proceeds as follows. We first clarify the distinction between intrinsic and extrinsic properties (Section 2). We then state the Theorema Egregium precisely (Section 3), sketch its proof via the Gauss equations and Brioschi's formula (Section 4), explore its remarkable consequences for pizza, maps, and deformable surfaces (Section 5), and connect it to the deeper story of intrinsic geometry (Section 6).</p>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Intrinsic vs Extrinsic
        // ================================================================
        {
            id: 'sec-intrinsic-extrinsic',
            title: 'Intrinsic vs Extrinsic',
            content: `
<h2>Intrinsic vs Extrinsic Geometry</h2>

<div class="env-block intuition">
    <div class="env-title">The Bug on the Surface</div>
    <div class="env-body">
        <p>A bug crawling on a surface can measure distances (by counting steps), angles (by comparing directions), and areas (by tiling regions). These are <em>intrinsic</em> measurements. But the bug cannot tell whether the surface is embedded in \\(\\mathbb{R}^3\\) as a cylinder or rolled out flat, because both surfaces have the same intrinsic geometry: \\(K = 0\\) everywhere.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Intrinsic Property)</div>
    <div class="env-body">
        <p>A property of a surface \\(S\\) is <strong>intrinsic</strong> if it depends only on the first fundamental form \\(\\mathrm{I} = E\\,du^2 + 2F\\,du\\,dv + G\\,dv^2\\) and its derivatives. Equivalently, it is preserved under <strong>isometries</strong> (distance-preserving maps between surfaces).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Extrinsic Property)</div>
    <div class="env-body">
        <p>A property is <strong>extrinsic</strong> if it depends on how the surface is embedded in \\(\\mathbb{R}^3\\), i.e., on the second fundamental form or the Gauss map.</p>
    </div>
</div>

<h3>Examples</h3>

<div class="env-block example">
    <div class="env-title">Intrinsic Properties</div>
    <div class="env-body">
        <ul>
            <li><strong>Lengths of curves:</strong> \\(\\displaystyle L(\\gamma) = \\int_a^b \\sqrt{E\\dot{u}^2 + 2F\\dot{u}\\dot{v} + G\\dot{v}^2}\\,dt\\)</li>
            <li><strong>Angles between curves:</strong> determined by the metric via \\(\\cos\\theta = \\frac{\\mathrm{I}(v,w)}{|v|\\,|w|}\\)</li>
            <li><strong>Areas of regions:</strong> \\(\\displaystyle A = \\iint_R \\sqrt{EG - F^2}\\,du\\,dv\\)</li>
            <li><strong>Geodesics:</strong> shortest paths depend only on the metric</li>
            <li><strong>Gaussian curvature</strong> \\(K\\) (Theorema Egregium!)</li>
        </ul>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Extrinsic Properties</div>
    <div class="env-body">
        <ul>
            <li><strong>Principal curvatures</strong> \\(\\kappa_1, \\kappa_2\\) individually</li>
            <li><strong>Mean curvature</strong> \\(H = \\frac{\\kappa_1 + \\kappa_2}{2}\\)</li>
            <li><strong>The unit normal</strong> \\(N\\) and the Gauss map</li>
            <li><strong>The second fundamental form</strong> \\(\\mathrm{II}\\)</li>
        </ul>
    </div>
</div>

<h3>The Cylinder vs. the Plane</h3>

<p>A cylinder of radius \\(r\\) can be "unrolled" into a flat plane without stretching or tearing. This is an isometry: the first fundamental form of the cylinder</p>
\\[
\\mathrm{I} = d\\theta^2 \\cdot r^2 + dz^2
\\]
<p>is locally the same as \\(dx^2 + dy^2\\) on the plane (set \\(x = r\\theta\\)). Both have \\(K = 0\\).</p>

<p>But the principal curvatures differ: the cylinder has \\(\\kappa_1 = 1/r, \\kappa_2 = 0\\), while the plane has \\(\\kappa_1 = \\kappa_2 = 0\\). Their product \\(K = 0\\) is the same, but the individual values are not. The product \\(K\\) is intrinsic; the individual principal curvatures are extrinsic.</p>

<div class="env-block remark">
    <div class="env-title">Key Insight</div>
    <div class="env-body">
        <p>Mean curvature \\(H\\) is extrinsic: the cylinder has \\(H = 1/(2r) \\neq 0\\), while the plane has \\(H = 0\\). The Theorema Egregium says that only the <em>product</em> \\(K = \\kappa_1\\kappa_2\\) is intrinsic, not the sum \\(\\kappa_1 + \\kappa_2\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-intrinsic-extrinsic"></div>
`,
            visualizations: [
                {
                    id: 'viz-intrinsic-extrinsic',
                    title: 'Cylinder vs Sphere: Intrinsic Geometry',
                    description: 'A cylinder (K=0) can be unrolled flat; a sphere (K>0) cannot. Compare intrinsic vs extrinsic properties of both surfaces. Use the slider to morph between the cylinder and its unrolled flat form.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var morphT = 0;
                        VizEngine.createSlider(controls, 'Unroll', 0, 1, 0, 0.01, function(v) {
                            morphT = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            // Left panel: Cylinder morphing to flat
                            var panelW = W / 2 - 20;
                            var cx1 = panelW / 2 + 10;
                            var cy1 = H / 2 + 10;

                            viz.screenText('Cylinder (K = 0)', cx1, 20, viz.colors.blue, 14);

                            var R = 50;
                            var halfH = 80;
                            var nStrips = 24;

                            // Draw cylinder morphing to rectangle
                            for (var i = 0; i < nStrips; i++) {
                                var theta1 = (i / nStrips) * Math.PI * 2;
                                var theta2 = ((i + 1) / nStrips) * Math.PI * 2;

                                // Cylinder coordinates (3D projected)
                                var cylX1 = R * Math.sin(theta1);
                                var cylZ1 = R * Math.cos(theta1);
                                var cylX2 = R * Math.sin(theta2);
                                var cylZ2 = R * Math.cos(theta2);

                                // Only draw front-facing strips for cylinder
                                var frontFacing = (cylZ1 + cylZ2) / 2 > -R * 0.3;

                                // Flat coordinates
                                var flatX1 = (theta1 / (Math.PI * 2) - 0.5) * R * Math.PI * 2 * 0.5;
                                var flatX2 = (theta2 / (Math.PI * 2) - 0.5) * R * Math.PI * 2 * 0.5;

                                // Interpolate
                                var x1 = cylX1 * (1 - morphT) + flatX1 * morphT;
                                var x2 = cylX2 * (1 - morphT) + flatX2 * morphT;
                                var yOff = (cylZ1 * 0.3) * (1 - morphT);
                                var yOff2 = (cylZ2 * 0.3) * (1 - morphT);

                                var alpha = frontFacing ? 0.8 : 0.2 * (1 - morphT);
                                if (morphT > 0.5) alpha = 0.8;

                                var hue = (i / nStrips * 360);
                                ctx.fillStyle = 'hsla(' + hue + ', 60%, 45%, ' + alpha + ')';
                                ctx.beginPath();
                                ctx.moveTo(cx1 + x1, cy1 - halfH + yOff);
                                ctx.lineTo(cx1 + x2, cy1 - halfH + yOff2);
                                ctx.lineTo(cx1 + x2, cy1 + halfH + yOff2);
                                ctx.lineTo(cx1 + x1, cy1 + halfH + yOff);
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Draw a geodesic (helix on cylinder, straight line when flat)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var nPts = 80;
                            for (var j = 0; j <= nPts; j++) {
                                var t = j / nPts;
                                var theta = t * Math.PI * 2;
                                var cylGX = R * Math.sin(theta);
                                var cylGZ = R * Math.cos(theta);
                                var flatGX = (theta / (Math.PI * 2) - 0.5) * R * Math.PI * 2 * 0.5;
                                var gx = cylGX * (1 - morphT) + flatGX * morphT;
                                var yBase = (t - 0.5) * halfH * 2;
                                var gyOff = (cylGZ * 0.3) * (1 - morphT);
                                var px = cx1 + gx;
                                var py = cy1 + yBase * 0.8 + gyOff;
                                if (j === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            var label1 = morphT < 0.5 ? 'Geodesic (helix)' : 'Geodesic (straight line)';
                            viz.screenText(label1, cx1, H - 40, viz.colors.orange, 11);
                            viz.screenText(morphT < 0.5 ? 'Isometry: unroll!' : 'Same intrinsic geometry', cx1, H - 20, viz.colors.text, 11);

                            // Right panel: Sphere (cannot flatten)
                            var cx2 = W / 2 + panelW / 2 + 10;
                            var cy2 = H / 2 + 10;

                            viz.screenText('Sphere (K = 1/r\u00B2 > 0)', cx2, 20, viz.colors.teal, 14);

                            // Draw sphere wireframe
                            var Rs = 70;
                            var nLat = 12;
                            var nLon = 16;

                            // Latitude lines
                            ctx.strokeStyle = viz.colors.teal + '55';
                            ctx.lineWidth = 1;
                            for (var lat = 1; lat < nLat; lat++) {
                                var phi = (lat / nLat) * Math.PI;
                                var rLat = Rs * Math.sin(phi);
                                var yLat = -Rs * Math.cos(phi);

                                ctx.beginPath();
                                for (var ll = 0; ll <= 40; ll++) {
                                    var lam = (ll / 40) * Math.PI * 2;
                                    var sx = cx2 + rLat * Math.sin(lam);
                                    var sy = cy2 + yLat * 0.6 + rLat * Math.cos(lam) * 0.3;
                                    if (ll === 0) ctx.moveTo(sx, sy);
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }

                            // Longitude lines
                            for (var lon = 0; lon < nLon; lon++) {
                                var lam2 = (lon / nLon) * Math.PI * 2;
                                ctx.strokeStyle = viz.colors.teal + '44';
                                ctx.beginPath();
                                for (var pp = 0; pp <= 40; pp++) {
                                    var phi2 = (pp / 40) * Math.PI;
                                    var sx2 = cx2 + Rs * Math.sin(phi2) * Math.sin(lam2);
                                    var sy2 = cy2 - Rs * Math.cos(phi2) * 0.6 + Rs * Math.sin(phi2) * Math.cos(lam2) * 0.3;
                                    if (pp === 0) ctx.moveTo(sx2, sy2);
                                    else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // Sphere outline
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.ellipse(cx2, cy2, Rs, Rs * 0.6, 0, 0, Math.PI * 2);
                            ctx.stroke();

                            // X mark for "cannot flatten"
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(cx2 + Rs + 15, cy2 + Rs * 0.4);
                            ctx.lineTo(cx2 + Rs + 30, cy2 + Rs * 0.4 + 15);
                            ctx.moveTo(cx2 + Rs + 30, cy2 + Rs * 0.4);
                            ctx.lineTo(cx2 + Rs + 15, cy2 + Rs * 0.4 + 15);
                            ctx.stroke();

                            viz.screenText('Cannot unroll to plane!', cx2, H - 40, viz.colors.red, 11);
                            viz.screenText('K > 0: no isometry to flat surface', cx2, H - 20, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A cone (excluding the apex) can be unrolled into a flat sector. What is the Gaussian curvature of a cone away from its apex?',
                    hint: 'If two surfaces are isometric, they have the same Gaussian curvature everywhere. A flat sector in the plane has \\(K = 0\\).',
                    solution: 'Since the cone (minus apex) is isometric to a flat region of the plane, its Gaussian curvature is \\(K = 0\\) everywhere (except at the apex, where curvature is not defined in the classical sense, but concentrated as a delta-function in the sense of angle defect).'
                },
                {
                    question: 'Is the length of a curve on a surface an intrinsic or extrinsic quantity? What about the normal curvature of a curve?',
                    hint: 'Check whether each depends only on the first fundamental form or also on the second.',
                    solution: 'The length \\(L = \\int \\sqrt{E\\dot{u}^2 + 2F\\dot{u}\\dot{v} + G\\dot{v}^2}\\,dt\\) depends only on the first fundamental form, so it is intrinsic. The normal curvature \\(\\kappa_n = \\mathrm{II}(\\dot{\\gamma},\\dot{\\gamma})/\\mathrm{I}(\\dot{\\gamma},\\dot{\\gamma})\\) involves the second fundamental form, so it is extrinsic.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Theorema Egregium
        // ================================================================
        {
            id: 'sec-theorem',
            title: 'Theorema Egregium',
            content: `
<h2>Gauss's Theorema Egregium</h2>

<p>We now state the central theorem of this chapter. Recall that the first fundamental form in a parametrization \\(\\mathbf{r}(u,v)\\) is given by the coefficients</p>
\\[
E = \\mathbf{r}_u \\cdot \\mathbf{r}_u, \\quad F = \\mathbf{r}_u \\cdot \\mathbf{r}_v, \\quad G = \\mathbf{r}_v \\cdot \\mathbf{r}_v.
\\]

<div class="env-block theorem">
    <div class="env-title">Theorem 8.1 (Gauss's Theorema Egregium, 1827)</div>
    <div class="env-body">
        <p>The Gaussian curvature \\(K\\) of a regular surface is an intrinsic invariant. That is, \\(K\\) can be expressed as a function of \\(E, F, G\\) and their first and second partial derivatives with respect to the surface parameters \\(u, v\\) alone.</p>
        <p>Consequently, if \\(\\phi: S_1 \\to S_2\\) is a local isometry, then \\(K_{S_1}(p) = K_{S_2}(\\phi(p))\\) for every \\(p \\in S_1\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">What Makes This Surprising</div>
    <div class="env-body">
        <p>Gaussian curvature is <em>defined</em> as \\(K = \\det(dN_p) = \\kappa_1 \\kappa_2\\), which involves the shape operator (second fundamental form), an extrinsic object. The theorem says that the extrinsic definition miraculously collapses to something purely intrinsic. The individual principal curvatures \\(\\kappa_1, \\kappa_2\\) are not intrinsic, nor is their sum \\(H\\). Only their product \\(K\\) is.</p>
    </div>
</div>

<h3>The Explicit Formula (Orthogonal Parametrization)</h3>

<p>In the special case \\(F = 0\\) (an orthogonal parametrization), the formula simplifies considerably. Gauss showed:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.2 (Gauss Curvature, Orthogonal Case)</div>
    <div class="env-body">
        <p>If \\(F = 0\\), then</p>
        \\[
        K = -\\frac{1}{2\\sqrt{EG}} \\left[ \\frac{\\partial}{\\partial u}\\left(\\frac{G_u}{\\sqrt{EG}}\\right) + \\frac{\\partial}{\\partial v}\\left(\\frac{E_v}{\\sqrt{EG}}\\right) \\right],
        \\]
        <p>where subscripts denote partial derivatives: \\(E_v = \\partial E / \\partial v\\), etc.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Surface of Revolution</div>
    <div class="env-body">
        <p>For a surface of revolution \\(\\mathbf{r}(u,v) = (f(u)\\cos v, f(u)\\sin v, g(u))\\) with \\(f > 0\\) and \\((f')^2 + (g')^2 = 1\\) (arc-length parametrization of the profile curve), we have \\(E = 1\\), \\(F = 0\\), \\(G = f(u)^2\\).</p>
        <p>Then \\(E_v = 0\\), \\(G_u = 2f f'\\), so</p>
        \\[
        K = -\\frac{1}{2f}\\frac{\\partial}{\\partial u}\\left(\\frac{2ff'}{f}\\right) = -\\frac{1}{f}\\frac{\\partial f'}{\\partial u} = -\\frac{f''}{f}.
        \\]
        <p>This is the classical formula: \\(K = -f''/f\\). For a sphere of radius \\(R\\), \\(f(u) = R\\sin(u/R)\\), so \\(f'' = -\\sin(u/R)/R\\) and \\(K = 1/R^2\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-isometry-invariant"></div>
`,
            visualizations: [
                {
                    id: 'viz-isometry-invariant',
                    title: 'Isometry Invariance of K',
                    description: 'Bend a surface without stretching it (an isometry). The Gaussian curvature K stays the same at every point, even though the shape in 3D changes. Drag the slider to bend.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var bendAmt = 0;
                        VizEngine.createSlider(controls, 'Bend', 0, 1, 0, 0.01, function(v) {
                            bendAmt = v;
                        });

                        var time = 0;

                        function drawFrame(t) {
                            time = t * 0.001;
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            viz.screenText('Bending a flat sheet (K = 0 everywhere)', W / 2, 20, viz.colors.white, 14);

                            var cx = W / 2;
                            var cy = H / 2 + 20;
                            var gridN = 16;
                            var gridM = 20;
                            var cellW = 12;
                            var cellH = 10;

                            // The bend: roll into partial cylinder
                            var maxAngle = bendAmt * Math.PI * 1.5;
                            var R = (maxAngle > 0.01) ? (gridM * cellW) / maxAngle : 1e6;

                            // Draw grid
                            for (var i = 0; i <= gridN; i++) {
                                ctx.strokeStyle = (i % 4 === 0) ? viz.colors.blue + 'aa' : viz.colors.blue + '44';
                                ctx.lineWidth = (i % 4 === 0) ? 1.5 : 0.8;
                                ctx.beginPath();
                                for (var j = 0; j <= gridM; j++) {
                                    var u = j / gridM;
                                    var angle = u * maxAngle;
                                    var flatX = (j - gridM / 2) * cellW;
                                    var bentX = R * Math.sin(angle) - R * Math.sin(maxAngle / 2);
                                    var bentZ = R * Math.cos(angle) - R * Math.cos(maxAngle / 2);
                                    var px = cx + flatX * (1 - bendAmt) + bentX * bendAmt;
                                    var py = cy + (i - gridN / 2) * cellH + bentZ * 0.4 * bendAmt;
                                    if (j === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                            }

                            for (var j2 = 0; j2 <= gridM; j2++) {
                                ctx.strokeStyle = (j2 % 4 === 0) ? viz.colors.teal + 'aa' : viz.colors.teal + '44';
                                ctx.lineWidth = (j2 % 4 === 0) ? 1.5 : 0.8;
                                ctx.beginPath();
                                for (var i2 = 0; i2 <= gridN; i2++) {
                                    var u2 = j2 / gridM;
                                    var angle2 = u2 * maxAngle;
                                    var flatX2 = (j2 - gridM / 2) * cellW;
                                    var bentX2 = R * Math.sin(angle2) - R * Math.sin(maxAngle / 2);
                                    var bentZ2 = R * Math.cos(angle2) - R * Math.cos(maxAngle / 2);
                                    var px2 = cx + flatX2 * (1 - bendAmt) + bentX2 * bendAmt;
                                    var py2 = cy + (i2 - gridN / 2) * cellH + bentZ2 * 0.4 * bendAmt;
                                    if (i2 === 0) ctx.moveTo(px2, py2);
                                    else ctx.lineTo(px2, py2);
                                }
                                ctx.stroke();
                            }

                            // K readout
                            viz.screenText('K = 0 everywhere (invariant under bending!)', W / 2, H - 45, viz.colors.green, 13);
                            viz.screenText('Distances within the surface are preserved', W / 2, H - 25, viz.colors.text, 11);

                            // Side info
                            var kLabel = bendAmt < 0.01 ? 'Flat plane' : bendAmt > 0.9 ? 'Partial cylinder' : 'Bent sheet';
                            viz.screenText(kLabel, W / 2, 45, viz.colors.orange, 12);
                        }

                        viz.animate(drawFrame);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the Gaussian curvature of the torus parametrized by \\(\\mathbf{r}(u,v) = ((R + r\\cos u)\\cos v, (R + r\\cos u)\\sin v, r\\sin u)\\) using the formula \\(K = -f\'\'/f\\) for surfaces of revolution.',
                    hint: 'Here the profile curve is a circle of radius \\(r\\) at distance \\(R\\) from the axis. The function \\(f(u) = R + r\\cos u\\).',
                    solution: 'We have \\(f(u) = R + r\\cos u\\), so \\(f\'(u) = -r\\sin u\\) and \\(f\'\'(u) = -r\\cos u\\). Thus \\(K = -f\'\'/f = r\\cos u/(R + r\\cos u)\\). Note: \\(K > 0\\) on the outer equator (\\(u = 0\\)), \\(K < 0\\) on the inner equator (\\(u = \\pi\\)), and \\(K = 0\\) on the top and bottom circles (\\(u = \\pm\\pi/2\\)).'
                },
                {
                    question: 'If two surfaces are isometric, must they have the same mean curvature? Give an example or proof.',
                    hint: 'Think of the cylinder and the plane.',
                    solution: 'No. The cylinder of radius \\(r\\) and the plane are isometric (\\(K = 0\\) for both), but the cylinder has \\(H = 1/(2r)\\) while the plane has \\(H = 0\\). Mean curvature is extrinsic.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Proof Sketch
        // ================================================================
        {
            id: 'sec-proof',
            title: 'Proof Sketch',
            content: `
<h2>Proof Sketch: Gauss Equations and Brioschi's Formula</h2>

<div class="env-block intuition">
    <div class="env-title">Strategy</div>
    <div class="env-body">
        <p>The proof proceeds by expressing \\(K = \\det(\\mathrm{II}) / \\det(\\mathrm{I})\\) purely in terms of \\(E, F, G\\) and their derivatives. The key tool is the <strong>Gauss equation</strong>, which relates the Riemann curvature tensor to the shape operator via the coefficients of the first and second fundamental forms.</p>
    </div>
</div>

<h3>The Gauss Equations</h3>

<p>Let \\(\\{\\mathbf{r}_u, \\mathbf{r}_v, N\\}\\) be the moving frame. The Christoffel symbols \\(\\Gamma^k_{ij}\\) encode how \\(\\mathbf{r}_u\\) and \\(\\mathbf{r}_v\\) change along the surface:</p>
\\[
\\mathbf{r}_{uu} = \\Gamma^1_{11}\\mathbf{r}_u + \\Gamma^2_{11}\\mathbf{r}_v + eN, \\quad
\\mathbf{r}_{uv} = \\Gamma^1_{12}\\mathbf{r}_u + \\Gamma^2_{12}\\mathbf{r}_v + fN,
\\]
\\[
\\mathbf{r}_{vv} = \\Gamma^1_{22}\\mathbf{r}_u + \\Gamma^2_{22}\\mathbf{r}_v + gN,
\\]
<p>where \\(e, f, g\\) are the second fundamental form coefficients. The Christoffel symbols depend only on \\(E, F, G\\) and their derivatives:</p>
\\[
\\Gamma^k_{ij} = \\frac{1}{2}g^{kl}\\left(\\frac{\\partial g_{il}}{\\partial x^j} + \\frac{\\partial g_{jl}}{\\partial x^i} - \\frac{\\partial g_{ij}}{\\partial x^l}\\right)
\\]
<p>where \\((g_{ij}) = \\begin{pmatrix} E & F \\\\ F & G \\end{pmatrix}\\) and \\((g^{ij})\\) is its inverse.</p>

<p>The <strong>Gauss equation</strong> (the compatibility condition from \\(\\mathbf{r}_{uuv} = \\mathbf{r}_{uvu}\\)) yields:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.3 (Gauss Equation)</div>
    <div class="env-body">
        \\[
        K = \\frac{eg - f^2}{EG - F^2} = \\frac{R_{1212}}{EG - F^2},
        \\]
        <p>where \\(R_{1212}\\) is a component of the Riemann curvature tensor, expressible entirely in terms of the Christoffel symbols (hence in terms of \\(E, F, G\\) and their derivatives).</p>
    </div>
</div>

<h3>Brioschi's Formula</h3>

<p>Brioschi gave an explicit formula that makes the intrinsic nature completely transparent. For a general parametrization (\\(F\\) not necessarily zero):</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.4 (Brioschi Formula)</div>
    <div class="env-body">
        \\[
        K = \\frac{1}{(EG - F^2)^2} \\left( \\begin{vmatrix} -\\frac{1}{2}E_{vv} + F_{uv} - \\frac{1}{2}G_{uu} & \\frac{1}{2}E_u & F_u - \\frac{1}{2}E_v \\\\ F_v - \\frac{1}{2}G_u & E & F \\\\ \\frac{1}{2}G_v & F & G \\end{vmatrix} - \\begin{vmatrix} 0 & \\frac{1}{2}E_v & \\frac{1}{2}G_u \\\\ \\frac{1}{2}E_v & E & F \\\\ \\frac{1}{2}G_u & F & G \\end{vmatrix} \\right)
        \\]
    </div>
</div>

<p>This formula involves only \\(E, F, G\\) and their first and second partial derivatives, with no reference to the normal \\(N\\) or the second fundamental form. This is the explicit content of the Theorema Egregium.</p>

<div class="env-block remark">
    <div class="env-title">Proof Outline</div>
    <div class="env-body">
        <ol>
            <li>Express \\(e, f, g\\) (second fundamental form) in terms of \\(\\mathbf{r}_{uu}, \\mathbf{r}_{uv}, \\mathbf{r}_{vv}\\) and \\(N\\).</li>
            <li>Use \\(eg - f^2 = \\det(\\mathrm{II})\\) and expand using the triple product identities.</li>
            <li>The Gauss equation shows that the numerator \\(eg - f^2\\) equals \\(R_{1212}\\), which involves only Christoffel symbols.</li>
            <li>Christoffel symbols are built from \\(E, F, G\\) and their first derivatives.</li>
            <li>Therefore \\(K = R_{1212}/(EG - F^2)\\) depends only on the first fundamental form.</li>
        </ol>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-brioschi"></div>
`,
            visualizations: [
                {
                    id: 'viz-brioschi',
                    title: 'K from E, F, G Alone: Step-by-Step',
                    description: 'Watch the Gaussian curvature computed from the first fundamental form coefficients alone, with no reference to the embedding. Choose a surface and see the pipeline: metric coefficients, their derivatives, then K.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var surfaceType = 0;  // 0: sphere, 1: torus, 2: saddle, 3: cylinder
                        var surfaceNames = ['Sphere (R=2)', 'Torus (R=3, r=1)', 'Saddle (z=xy)', 'Cylinder (r=1)'];

                        VizEngine.createButton(controls, 'Sphere', function() { surfaceType = 0; draw(); });
                        VizEngine.createButton(controls, 'Torus', function() { surfaceType = 1; draw(); });
                        VizEngine.createButton(controls, 'Saddle', function() { surfaceType = 2; draw(); });
                        VizEngine.createButton(controls, 'Cylinder', function() { surfaceType = 3; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            viz.screenText(surfaceNames[surfaceType], W / 2, 20, viz.colors.white, 15);
                            viz.screenText('Computing K from the metric alone', W / 2, 40, viz.colors.text, 11);

                            // Display the pipeline
                            var boxW = 130;
                            var boxH = 55;
                            var startY = 70;
                            var gap = 30;
                            var col1x = 20;
                            var col2x = col1x + boxW + gap;
                            var col3x = col2x + boxW + gap;

                            // Step 1: First Fundamental Form
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(col1x, startY, boxW + 20, boxH + 40);
                            viz.screenText('Step 1: Metric', col1x + (boxW + 20) / 2, startY - 8, viz.colors.blue, 12);

                            var metricLines;
                            if (surfaceType === 0) { // Sphere
                                metricLines = ['E = R\u00B2', 'F = 0', 'G = R\u00B2sin\u00B2\u03B8'];
                            } else if (surfaceType === 1) { // Torus
                                metricLines = ['E = r\u00B2', 'F = 0', 'G = (R+rcos u)\u00B2'];
                            } else if (surfaceType === 2) { // Saddle
                                metricLines = ['E = 1 + v\u00B2', 'F = uv', 'G = 1 + u\u00B2'];
                            } else { // Cylinder
                                metricLines = ['E = 1', 'F = 0', 'G = r\u00B2'];
                            }
                            for (var i = 0; i < metricLines.length; i++) {
                                viz.screenText(metricLines[i], col1x + (boxW + 20) / 2, startY + 20 + i * 22, viz.colors.white, 12);
                            }

                            // Arrow
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(col1x + boxW + 22, startY + (boxH + 40) / 2);
                            ctx.lineTo(col2x - 2, startY + (boxH + 40) / 2);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(col2x - 2, startY + (boxH + 40) / 2);
                            ctx.lineTo(col2x - 10, startY + (boxH + 40) / 2 - 5);
                            ctx.lineTo(col2x - 10, startY + (boxH + 40) / 2 + 5);
                            ctx.closePath();
                            ctx.fill();

                            // Step 2: Derivatives
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(col2x, startY, boxW + 20, boxH + 40);
                            viz.screenText('Step 2: Derivatives', col2x + (boxW + 20) / 2, startY - 8, viz.colors.teal, 12);

                            var derivLines;
                            if (surfaceType === 0) {
                                derivLines = ['E_v = 0, G_u = R\u00B2sin2\u03B8', 'E_vv = 0', 'G_uu = 2R\u00B2cos2\u03B8'];
                            } else if (surfaceType === 1) {
                                derivLines = ['G_u = -2r(R+rcosu)sinu', 'G_uu = ...', 'E_v = 0'];
                            } else if (surfaceType === 2) {
                                derivLines = ['E_v = 2v, G_u = 2u', 'F_u = v, F_v = u', 'E_vv = 2, G_uu = 2'];
                            } else {
                                derivLines = ['E_v = 0, G_u = 0', 'All second', 'derivatives = 0'];
                            }
                            for (var j = 0; j < derivLines.length; j++) {
                                viz.screenText(derivLines[j], col2x + (boxW + 20) / 2, startY + 20 + j * 22, viz.colors.white, 11);
                            }

                            // Arrow
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(col2x + boxW + 22, startY + (boxH + 40) / 2);
                            ctx.lineTo(col3x - 2, startY + (boxH + 40) / 2);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(col3x - 2, startY + (boxH + 40) / 2);
                            ctx.lineTo(col3x - 10, startY + (boxH + 40) / 2 - 5);
                            ctx.lineTo(col3x - 10, startY + (boxH + 40) / 2 + 5);
                            ctx.closePath();
                            ctx.fill();

                            // Step 3: Result
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(col3x, startY, boxW + 20, boxH + 40);
                            viz.screenText('Step 3: K', col3x + (boxW + 20) / 2, startY - 8, viz.colors.green, 12);

                            var resultLines;
                            if (surfaceType === 0) {
                                resultLines = ['K = 1/R\u00B2', '= 1/4', '(constant > 0)'];
                            } else if (surfaceType === 1) {
                                resultLines = ['K = cos u', '  / r(R + r cos u)', '(varies with u)'];
                            } else if (surfaceType === 2) {
                                resultLines = ['K = -1/(1+u\u00B2+v\u00B2)\u00B2', '< 0 everywhere', '(hyperbolic)'];
                            } else {
                                resultLines = ['K = 0', 'everywhere', '(flat!)'];
                            }
                            for (var k = 0; k < resultLines.length; k++) {
                                viz.screenText(resultLines[k], col3x + (boxW + 20) / 2, startY + 20 + k * 22, viz.colors.white, 12);
                            }

                            // Bottom: curvature color map
                            var mapY = startY + boxH + 70;
                            var mapW = W - 80;
                            var mapH = 100;
                            var mapX = 40;

                            viz.screenText('Curvature map (color = K)', W / 2, mapY - 5, viz.colors.white, 12);

                            // Draw a 2D grid colored by K
                            var nU = 50, nV = 50;
                            for (var iu = 0; iu < nU; iu++) {
                                for (var iv = 0; iv < nV; iv++) {
                                    var u = iu / nU;
                                    var v = iv / nV;
                                    var kVal = 0;
                                    if (surfaceType === 0) {
                                        kVal = 0.25;
                                    } else if (surfaceType === 1) {
                                        var uu = u * Math.PI * 2;
                                        kVal = Math.cos(uu) / (1 * (3 + 1 * Math.cos(uu)));
                                    } else if (surfaceType === 2) {
                                        var su = (u - 0.5) * 4;
                                        var sv = (v - 0.5) * 4;
                                        kVal = -1 / Math.pow(1 + su * su + sv * sv, 2);
                                    } else {
                                        kVal = 0;
                                    }

                                    // Map K to color: blue = negative, green = zero, red = positive
                                    var r2, g2, b2;
                                    if (kVal > 0) {
                                        var t2 = Math.min(1, kVal * 4);
                                        r2 = Math.round(50 + 200 * t2);
                                        g2 = Math.round(80 * (1 - t2));
                                        b2 = 50;
                                    } else if (kVal < 0) {
                                        var t3 = Math.min(1, -kVal * 4);
                                        r2 = 50;
                                        g2 = Math.round(80 * (1 - t3));
                                        b2 = Math.round(50 + 200 * t3);
                                    } else {
                                        r2 = 50; g2 = 120; b2 = 50;
                                    }
                                    ctx.fillStyle = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';
                                    ctx.fillRect(
                                        mapX + iu / nU * mapW,
                                        mapY + iv / nV * mapH,
                                        mapW / nU + 1,
                                        mapH / nV + 1
                                    );
                                }
                            }

                            // Legend
                            viz.screenText('K < 0', mapX + 30, mapY + mapH + 18, viz.colors.blue, 11);
                            viz.screenText('K = 0', W / 2, mapY + mapH + 18, viz.colors.green, 11);
                            viz.screenText('K > 0', mapX + mapW - 30, mapY + mapH + 18, viz.colors.red, 11);

                            // Key message
                            viz.screenText('No normal vector N needed!', W / 2, H - 15, viz.colors.orange, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the Brioschi formula to verify that \\(K = 0\\) for the plane (\\(E = G = 1, F = 0\\)).',
                    hint: 'All partial derivatives of \\(E, F, G\\) vanish.',
                    solution: 'Since \\(E = G = 1\\) and \\(F = 0\\) are all constant, every partial derivative (\\(E_u, E_v, F_u, \\ldots, G_{uu}, \\ldots\\)) is zero. Both determinants in Brioschi\'s formula are zero (every entry in the first rows/columns is 0). Hence \\(K = 0\\).'
                },
                {
                    question: 'For a surface with \\(E = 1, F = 0, G = \\cosh^2 u\\), compute \\(K\\) using the orthogonal formula.',
                    hint: '\\(G_u = 2\\cosh u \\sinh u = \\sinh 2u\\). Compute \\(\\partial/\\partial u (G_u / \\sqrt{EG})\\).',
                    solution: 'We have \\(\\sqrt{EG} = \\cosh u\\), so \\(G_u/\\sqrt{EG} = \\sinh 2u / \\cosh u = 2\\sinh u\\). Then \\(\\partial(2\\sinh u)/\\partial u = 2\\cosh u\\). Since \\(E_v = 0\\), the formula gives \\(K = -\\frac{1}{2\\cosh u}\\cdot 2\\cosh u = -1\\). This is the hyperbolic plane in the upper half-plane model, with constant negative curvature \\(K = -1\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Consequences
        // ================================================================
        {
            id: 'sec-consequences',
            title: 'Consequences',
            content: `
<h2>Consequences of the Theorema Egregium</h2>

<p>The Theorema Egregium has far-reaching implications. If you can't change \\(K\\) by bending (without stretching), then:</p>

<h3>1. You Can't Flatten a Sphere</h3>

<div class="env-block theorem">
    <div class="env-title">Corollary 8.1</div>
    <div class="env-body">
        <p>No open region of a sphere (\\(K = 1/R^2 > 0\\)) is isometric to any region of the plane (\\(K = 0\\)). In other words, there is no distance-preserving map from any piece of a sphere to a flat plane.</p>
    </div>
</div>

<p>This is the fundamental impossibility behind cartography: every map of the Earth must introduce some distortion. You can preserve angles (conformal maps, like Mercator), or areas (equal-area maps, like Mollweide), or shortest paths (gnomonic projection), but never all three simultaneously.</p>

<h3>2. The Pizza Theorem</h3>

<div class="env-block example">
    <div class="env-title">Example: Why Pizza Slices Droop (and How to Fix It)</div>
    <div class="env-body">
        <p>A flat pizza slice has \\(K = 0\\). When you pick it up, gravity tries to bend it, but bending without stretching preserves \\(K = 0\\). If the slice curves downward along its length (gaining curvature \\(\\kappa_1 > 0\\) in the longitudinal direction), then maintaining \\(K = \\kappa_1 \\kappa_2 = 0\\) forces \\(\\kappa_2 = 0\\): no transverse bending. The slice droops.</p>
        <p>The fix: fold the slice along its length, introducing curvature in the transverse direction (\\(\\kappa_2 > 0\\)). Now \\(K = 0\\) forces \\(\\kappa_1 = 0\\), and the slice becomes rigid in the longitudinal direction!</p>
    </div>
</div>

<h3>3. Corrugated Cardboard and Architectural Shells</h3>

<p>The same principle explains why corrugated cardboard is stiff: the corrugations introduce curvature in one direction, which (by \\(K = 0\\) for the inextensible paper) prevents bending in the perpendicular direction. Thin-shell structures in architecture (like barrel vaults and hyperbolic paraboloids) exploit this interplay between curvatures.</p>

<h3>4. Map Projections</h3>

<p>Every map projection from the sphere to the plane must introduce distortion, because \\(K_{\\text{sphere}} = 1/R^2 \\neq 0 = K_{\\text{plane}}\\). Different projections make different compromises:</p>

<div class="env-block example">
    <div class="env-title">Map Projections and Distortion</div>
    <div class="env-body">
        <ul>
            <li><strong>Mercator</strong> (conformal): preserves angles, distorts areas (Greenland appears huge)</li>
            <li><strong>Lambert equal-area</strong>: preserves areas, distorts shapes</li>
            <li><strong>Gnomonic</strong>: geodesics become straight lines, but massive area/angle distortion</li>
            <li><strong>Equirectangular</strong>: simple \\((\\phi, \\lambda)\\) grid, distorts both</li>
        </ul>
        <p>The Theorema Egregium guarantees that no projection can preserve both angles and areas, because that would be an isometry, which is impossible between surfaces of different \\(K\\).</p>
    </div>
</div>

<h3>5. Ruled Surfaces</h3>

<div class="env-block theorem">
    <div class="env-title">Corollary 8.2</div>
    <div class="env-body">
        <p>A surface made of inextensible material that was originally flat (\\(K = 0\\)) can only be bent into other surfaces with \\(K = 0\\). The only complete surfaces in \\(\\mathbb{R}^3\\) with \\(K = 0\\) everywhere are planes, cylinders, cones, and tangent developable surfaces (collectively called <strong>developable surfaces</strong>).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-pizza-theorem"></div>
<div class="viz-placeholder" data-viz="viz-map-projections"></div>
`,
            visualizations: [
                {
                    id: 'viz-pizza-theorem',
                    title: 'The Pizza Theorem',
                    description: 'A flat pizza slice has K=0. Bending it lengthwise makes it droop. Folding it transversely forces it to stay straight. Drag the slider to fold the slice.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var foldAmt = 0;
                        VizEngine.createSlider(controls, 'Fold', 0, 1, 0, 0.01, function(v) {
                            foldAmt = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            // Left: unfilled (droopy)
                            var cx1 = W / 4;
                            var cy1 = H / 2 - 20;
                            viz.screenText('No fold: slice droops', cx1, 25, viz.colors.red, 13);

                            // Draw droopy pizza slice (side view)
                            var sliceLen = 130;
                            var droopAmt = 40;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            for (var i = 0; i <= 40; i++) {
                                var t = i / 40;
                                var x = cx1 - sliceLen / 2 + t * sliceLen;
                                var y = cy1 + droopAmt * Math.pow(t - 0.0, 2) * (1 - t) * 4;
                                if (i === 0) ctx.moveTo(x, y);
                                else ctx.lineTo(x, y);
                            }
                            ctx.stroke();

                            // Gravity arrow
                            ctx.strokeStyle = viz.colors.red + '88';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(cx1 + 30, cy1 + 10);
                            ctx.lineTo(cx1 + 30, cy1 + 45);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.red + '88';
                            ctx.beginPath();
                            ctx.moveTo(cx1 + 30, cy1 + 48);
                            ctx.lineTo(cx1 + 25, cy1 + 40);
                            ctx.lineTo(cx1 + 35, cy1 + 40);
                            ctx.closePath();
                            ctx.fill();
                            viz.screenText('g', cx1 + 42, cy1 + 30, viz.colors.red, 11);

                            viz.screenText('\u03BA\u2081 > 0 (gravity bends it)', cx1, cy1 + 75, viz.colors.text, 10);
                            viz.screenText('\u03BA\u2082 = 0 (free to droop)', cx1, cy1 + 90, viz.colors.text, 10);
                            viz.screenText('K = \u03BA\u2081\u03BA\u2082 = 0  \u2713', cx1, cy1 + 110, viz.colors.green, 11);

                            // Right: folded (rigid)
                            var cx2 = 3 * W / 4;
                            var cy2 = H / 2 - 20;
                            viz.screenText('Folded: slice stays straight!', cx2, 25, viz.colors.green, 13);

                            // Draw folded pizza slice (cross section + side view)
                            // Cross section (V shape)
                            var foldAngle = foldAmt * Math.PI / 3;
                            var halfW = 40;
                            var leftX = cx2 - halfW * Math.cos(foldAngle);
                            var leftY = cy2 - 50 + halfW * Math.sin(foldAngle);
                            var rightX = cx2 + halfW * Math.cos(foldAngle);
                            var rightY = cy2 - 50 + halfW * Math.sin(foldAngle);
                            var midY = cy2 - 50;

                            // Draw the V shape (cross section)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(leftX, leftY);
                            ctx.lineTo(cx2, midY);
                            ctx.lineTo(rightX, rightY);
                            ctx.stroke();

                            // Draw the slice in perspective (rigid, no droop)
                            var sliceLen2 = 120;
                            var nLines = 8;
                            for (var j = 0; j <= nLines; j++) {
                                var t2 = j / nLines;
                                var perspScale = 0.5 + 0.5 * t2;
                                var pLeftX = cx2 - halfW * Math.cos(foldAngle) * perspScale;
                                var pLeftY = cy2 + halfW * Math.sin(foldAngle) * perspScale + t2 * sliceLen2 - 60;
                                var pRightX = cx2 + halfW * Math.cos(foldAngle) * perspScale;
                                var pRightY = cy2 + halfW * Math.sin(foldAngle) * perspScale + t2 * sliceLen2 - 60;
                                var pMidY = cy2 + t2 * sliceLen2 - 60;

                                ctx.strokeStyle = viz.colors.orange + (j === 0 || j === nLines ? 'cc' : '44');
                                ctx.lineWidth = j === 0 || j === nLines ? 2 : 1;
                                ctx.beginPath();
                                ctx.moveTo(pLeftX, pLeftY);
                                ctx.lineTo(cx2, pMidY);
                                ctx.lineTo(pRightX, pRightY);
                                ctx.stroke();
                            }

                            // Connect edges
                            ctx.strokeStyle = viz.colors.orange + 'aa';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(cx2 - halfW * Math.cos(foldAngle) * 0.5, cy2 + halfW * Math.sin(foldAngle) * 0.5 - 60);
                            ctx.lineTo(cx2 - halfW * Math.cos(foldAngle), cy2 + halfW * Math.sin(foldAngle) + sliceLen2 - 60);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(cx2 + halfW * Math.cos(foldAngle) * 0.5, cy2 + halfW * Math.sin(foldAngle) * 0.5 - 60);
                            ctx.lineTo(cx2 + halfW * Math.cos(foldAngle), cy2 + halfW * Math.sin(foldAngle) + sliceLen2 - 60);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(cx2, cy2 - 60);
                            ctx.lineTo(cx2, cy2 + sliceLen2 - 60);
                            ctx.stroke();

                            var k2Label = foldAmt > 0.1 ? '\u03BA\u2082 > 0 (you bent it!)' : '\u03BA\u2082 = 0 (flat)';
                            var k1Label = foldAmt > 0.1 ? '\u03BA\u2081 = 0 (forced rigid!)' : '\u03BA\u2081 can bend';
                            viz.screenText(k2Label, cx2, cy2 + 115, viz.colors.text, 10);
                            viz.screenText(k1Label, cx2, cy2 + 130, viz.colors.text, 10);
                            viz.screenText('K = \u03BA\u2081\u03BA\u2082 = 0  \u2713', cx2, cy2 + 150, viz.colors.green, 11);

                            // Bottom message
                            viz.screenText('Theorema Egregium: K = 0 must be preserved when bending without stretching', W / 2, H - 15, viz.colors.purple, 11);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-map-projections',
                    title: 'Map Projections: Inevitable Distortion',
                    description: 'The sphere has K = 1/R\u00B2 > 0, the plane has K = 0. No isometry exists between them, so every map projection must distort. Compare how different projections handle this impossibility.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var projType = 0;
                        var projNames = ['Equirectangular', 'Mercator (conformal)', 'Lambert (equal-area)', 'Sinusoidal'];

                        VizEngine.createButton(controls, 'Equirect.', function() { projType = 0; draw(); });
                        VizEngine.createButton(controls, 'Mercator', function() { projType = 1; draw(); });
                        VizEngine.createButton(controls, 'Lambert', function() { projType = 2; draw(); });
                        VizEngine.createButton(controls, 'Sinusoidal', function() { projType = 3; draw(); });

                        function project(lat, lon) {
                            // lat in [-pi/2, pi/2], lon in [-pi, pi]
                            if (projType === 0) { // Equirectangular
                                return [lon, lat];
                            } else if (projType === 1) { // Mercator
                                var clampLat = Math.max(-1.4, Math.min(1.4, lat));
                                return [lon, Math.log(Math.tan(Math.PI / 4 + clampLat / 2))];
                            } else if (projType === 2) { // Lambert cylindrical equal-area
                                return [lon, Math.sin(lat)];
                            } else { // Sinusoidal
                                return [lon * Math.cos(lat), lat];
                            }
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            viz.screenText(projNames[projType], W / 2, 20, viz.colors.white, 15);

                            // Map area
                            var mapX = 40, mapY = 50;
                            var mapW = W - 80, mapH = H - 110;

                            // Find bounds
                            var xMin = -Math.PI, xMax = Math.PI, yMin = -2, yMax = 2;
                            if (projType === 0) { yMin = -Math.PI / 2; yMax = Math.PI / 2; }
                            else if (projType === 1) { yMin = -2.5; yMax = 2.5; }
                            else if (projType === 2) { yMin = -1.1; yMax = 1.1; }
                            else { yMin = -Math.PI / 2; yMax = Math.PI / 2; }

                            function toMap(px, py) {
                                return [
                                    mapX + (px - xMin) / (xMax - xMin) * mapW,
                                    mapY + mapH - (py - yMin) / (yMax - yMin) * mapH
                                ];
                            }

                            // Draw grid lines (constant lat and lon)
                            // Latitude lines
                            for (var latDeg = -80; latDeg <= 80; latDeg += 20) {
                                var lat = latDeg * Math.PI / 180;
                                ctx.strokeStyle = (latDeg === 0) ? viz.colors.orange + '88' : viz.colors.blue + '44';
                                ctx.lineWidth = (latDeg === 0) ? 1.5 : 0.8;
                                ctx.beginPath();
                                var started = false;
                                for (var lonStep = -180; lonStep <= 180; lonStep += 2) {
                                    var lon = lonStep * Math.PI / 180;
                                    var p = project(lat, lon);
                                    var sp = toMap(p[0], p[1]);
                                    if (!started) { ctx.moveTo(sp[0], sp[1]); started = true; }
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                            }

                            // Longitude lines
                            for (var lonDeg = -180; lonDeg <= 180; lonDeg += 30) {
                                var lon2 = lonDeg * Math.PI / 180;
                                ctx.strokeStyle = (lonDeg === 0) ? viz.colors.orange + '88' : viz.colors.teal + '44';
                                ctx.lineWidth = (lonDeg === 0) ? 1.5 : 0.8;
                                ctx.beginPath();
                                var started2 = false;
                                for (var latStep = -85; latStep <= 85; latStep += 1) {
                                    var lat2 = latStep * Math.PI / 180;
                                    var p2 = project(lat2, lon2);
                                    var sp2 = toMap(p2[0], p2[1]);
                                    if (!started2) { ctx.moveTo(sp2[0], sp2[1]); started2 = true; }
                                    else ctx.lineTo(sp2[0], sp2[1]);
                                }
                                ctx.stroke();
                            }

                            // Draw Tissot indicatrices (small circles showing distortion)
                            var tissotR = 8 * Math.PI / 180;
                            var tissotPts = 24;
                            for (var tlat = -60; tlat <= 60; tlat += 30) {
                                for (var tlon = -150; tlon <= 150; tlon += 60) {
                                    var clat = tlat * Math.PI / 180;
                                    var clon = tlon * Math.PI / 180;
                                    var center = project(clat, clon);
                                    var sc = toMap(center[0], center[1]);

                                    ctx.strokeStyle = viz.colors.red + 'aa';
                                    ctx.fillStyle = viz.colors.red + '22';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    for (var ti = 0; ti <= tissotPts; ti++) {
                                        var angle = (ti / tissotPts) * Math.PI * 2;
                                        var dlat = clat + tissotR * Math.sin(angle);
                                        var dlon = clon + tissotR * Math.cos(angle) / Math.cos(clat);
                                        dlat = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, dlat));
                                        var dp = project(dlat, dlon);
                                        var dsp = toMap(dp[0], dp[1]);
                                        if (ti === 0) ctx.moveTo(dsp[0], dsp[1]);
                                        else ctx.lineTo(dsp[0], dsp[1]);
                                    }
                                    ctx.closePath();
                                    ctx.fill();
                                    ctx.stroke();
                                }
                            }

                            // Distortion info
                            var info;
                            if (projType === 0) info = 'Preserves: nothing special | Distorts: shapes + areas at high latitudes';
                            else if (projType === 1) info = 'Preserves: angles (conformal) | Distorts: areas (poles stretched to infinity)';
                            else if (projType === 2) info = 'Preserves: areas | Distorts: shapes (compressed near poles)';
                            else info = 'Preserves: areas | Distorts: shapes (sheared near edges)';

                            viz.screenText(info, W / 2, H - 25, viz.colors.text, 10);
                            viz.screenText('Red ellipses = Tissot indicatrices (should be circles on perfect map)', W / 2, H - 10, viz.colors.red, 9);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain, using the Theorema Egregium, why you cannot wrap a flat sheet of paper smoothly around a sphere without crumpling or stretching it.',
                    hint: 'What is \\(K\\) for the paper? What is \\(K\\) for the sphere?',
                    solution: 'A flat sheet of paper has \\(K = 0\\) everywhere. A sphere has \\(K = 1/R^2 > 0\\). Wrapping the paper around the sphere would be an isometry, which by the Theorema Egregium would require \\(K\\) to be preserved. Since \\(0 \\neq 1/R^2\\), no such isometry exists. The paper must stretch (changing its metric) or crumple (introducing creases/singularities).'
                },
                {
                    question: 'A cylindrical tube of paper is squished flat. Why does it naturally form two creases along its length?',
                    hint: 'The tube has \\(K = 0\\). The flat region has \\(K = 0\\). Where does \\(K\\) become singular?',
                    solution: 'The tube (\\(K = 0\\)) and the flat state (\\(K = 0\\)) are both developable, so the bending preserves \\(K = 0\\) almost everywhere. But at the two creases, the surface is not smooth; the curvature is concentrated along singular lines. The creases are necessary because a smooth deformation from cylinder to flat plane would require changing the topology of the cross-section (circle to line segment), which cannot be done smoothly while maintaining \\(K = 0\\) everywhere.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge to Intrinsic Geometry
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Bridge: Toward Intrinsic Geometry',
            content: `
<h2>Bridge: Toward Intrinsic Geometry</h2>

<p>The Theorema Egregium is more than a clever formula. It marks a philosophical turning point in geometry: the realization that a surface has an <em>intrinsic geometry</em> independent of any ambient space.</p>

<h3>From Surfaces to Manifolds</h3>

<div class="env-block intuition">
    <div class="env-title">The Paradigm Shift</div>
    <div class="env-body">
        <p>Before Gauss, geometry was about shapes embedded in Euclidean space. After Gauss (and especially after Riemann), geometry became about <em>metric spaces</em>: abstract spaces equipped with a notion of distance. The Theorema Egregium showed that the most important geometric invariant (curvature) is intrinsic, so the embedding is, in a precise sense, irrelevant.</p>
    </div>
</div>

<p>This insight leads directly to:</p>

<ul>
    <li><strong>Riemann's 1854 lecture:</strong> generalized Gauss's intrinsic geometry to arbitrary dimensions, founding Riemannian geometry</li>
    <li><strong>Abstract manifolds:</strong> spaces defined by coordinate charts and transition maps, with no ambient space required (Chapters 11-13)</li>
    <li><strong>General relativity:</strong> Einstein's spacetime is a 4-dimensional Lorentzian manifold; its curvature is intrinsic and describes gravity</li>
</ul>

<h3>The Gauss-Bonnet Connection</h3>

<div class="env-block theorem">
    <div class="env-title">Preview: Gauss-Bonnet Theorem (Chapter 9)</div>
    <div class="env-body">
        <p>For a compact surface \\(S\\) without boundary,</p>
        \\[
        \\int_S K\\,dA = 2\\pi\\,\\chi(S),
        \\]
        <p>where \\(\\chi(S)\\) is the Euler characteristic, a topological invariant. Since \\(K\\) is intrinsic (Theorema Egregium), the left side depends only on the metric. This connects intrinsic geometry to topology: the total curvature of a surface is determined by its shape (sphere, torus, etc.).</p>
    </div>
</div>

<h3>What Comes Next</h3>

<p>In Chapter 9, we prove the Gauss-Bonnet theorem and see how total curvature constrains topology. In Chapter 10, we study minimal surfaces (\\(H = 0\\)), where the extrinsic geometry takes center stage. Then in Part D, we leave surfaces behind entirely and develop the theory of smooth manifolds, where the Theorema Egregium's lesson, that geometry is intrinsic, becomes the foundation of everything.</p>

<div class="viz-placeholder" data-viz="viz-cylinder-unroll"></div>
`,
            visualizations: [
                {
                    id: 'viz-cylinder-unroll',
                    title: 'Cylinder Unrolls to Plane: K=0 Preserved',
                    description: 'A cylinder is isometric to a flat plane. Unroll it and watch geodesics (helices) become straight lines, while K=0 is preserved everywhere. This is the Theorema Egregium in action.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var unrollT = 0;
                        VizEngine.createSlider(controls, 'Unroll', 0, 1, 0, 0.01, function(v) {
                            unrollT = v;
                        });

                        var showGeodesic = true;
                        VizEngine.createButton(controls, 'Toggle geodesic', function() {
                            showGeodesic = !showGeodesic;
                        });

                        function drawFrame(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            viz.screenText('Cylinder \u2194 Plane isometry (K = 0 preserved)', W / 2, 18, viz.colors.white, 14);

                            var cx = W / 2;
                            var cy = H / 2 + 10;
                            var R = 55;
                            var cylH = 160;
                            var nRings = 12;
                            var nStrips = 32;

                            // Draw the morphing surface
                            var maxAngle = (1 - unrollT) * Math.PI * 2;
                            var flatW = Math.PI * 2 * R;

                            // Rings (horizontal)
                            for (var ring = 0; ring <= nRings; ring++) {
                                var yFrac = ring / nRings;
                                var ry = cy - cylH / 2 + yFrac * cylH;

                                ctx.strokeStyle = (ring % 3 === 0) ? viz.colors.blue + '99' : viz.colors.blue + '44';
                                ctx.lineWidth = (ring % 3 === 0) ? 1.2 : 0.6;
                                ctx.beginPath();
                                for (var s = 0; s <= nStrips; s++) {
                                    var frac = s / nStrips;
                                    var theta = frac * maxAngle;

                                    // Cylinder position
                                    var cylX = R * Math.sin(theta);
                                    var cylZ = R * Math.cos(theta);

                                    // Flat position
                                    var flatX = (frac - 0.5) * flatW;

                                    // Interpolate
                                    var px = cx + cylX * (1 - unrollT) + flatX * unrollT;
                                    var depth = cylZ * 0.25 * (1 - unrollT);
                                    var py = ry + depth;

                                    if (s === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                            }

                            // Verticals
                            for (var strip = 0; strip <= nStrips; strip += 4) {
                                var frac2 = strip / nStrips;
                                var theta2 = frac2 * maxAngle;

                                ctx.strokeStyle = viz.colors.teal + '44';
                                ctx.lineWidth = 0.6;
                                ctx.beginPath();
                                for (var r2 = 0; r2 <= nRings; r2++) {
                                    var yFrac2 = r2 / nRings;
                                    var ry2 = cy - cylH / 2 + yFrac2 * cylH;

                                    var cylX2 = R * Math.sin(theta2);
                                    var cylZ2 = R * Math.cos(theta2);
                                    var flatX2 = (frac2 - 0.5) * flatW;

                                    var px2 = cx + cylX2 * (1 - unrollT) + flatX2 * unrollT;
                                    var depth2 = cylZ2 * 0.25 * (1 - unrollT);
                                    var py2 = ry2 + depth2;

                                    if (r2 === 0) ctx.moveTo(px2, py2);
                                    else ctx.lineTo(px2, py2);
                                }
                                ctx.stroke();
                            }

                            // Geodesic (helix -> straight line)
                            if (showGeodesic) {
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                var nGPts = 100;
                                for (var g = 0; g <= nGPts; g++) {
                                    var gt = g / nGPts;
                                    var gTheta = gt * maxAngle * 0.8;
                                    var gFrac = gt * 0.8;

                                    var gCylX = R * Math.sin(gTheta);
                                    var gCylZ = R * Math.cos(gTheta);
                                    var gFlatX = (gFrac - 0.4) * flatW;

                                    var gpx = cx + gCylX * (1 - unrollT) + gFlatX * unrollT;
                                    var gry = cy - cylH / 2 + gt * cylH;
                                    var gDepth = gCylZ * 0.25 * (1 - unrollT);
                                    var gpy = gry + gDepth;

                                    if (g === 0) ctx.moveTo(gpx, gpy);
                                    else ctx.lineTo(gpx, gpy);
                                }
                                ctx.stroke();

                                var geodLabel = unrollT < 0.3 ? 'Helix (geodesic on cylinder)' : unrollT > 0.7 ? 'Straight line (geodesic on plane)' : 'Geodesic morphing...';
                                viz.screenText(geodLabel, W / 2, H - 55, viz.colors.orange, 12);
                            }

                            // Status
                            viz.screenText('K = 0 everywhere', W / 2, H - 35, viz.colors.green, 13);
                            var stateLabel = unrollT < 0.1 ? 'Cylinder' : unrollT > 0.9 ? 'Flat plane' : 'Unrolling... (isometry in progress)';
                            viz.screenText(stateLabel, W / 2, H - 15, viz.colors.text, 11);
                        }

                        viz.animate(drawFrame);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify the Gauss-Bonnet theorem for the sphere of radius \\(R\\): compute \\(\\int_S K\\,dA\\) and check it equals \\(2\\pi\\chi(S^2) = 4\\pi\\).',
                    hint: 'The sphere has \\(K = 1/R^2\\) everywhere and surface area \\(4\\pi R^2\\).',
                    solution: '\\(\\int_{S^2} K\\,dA = \\int_{S^2} \\frac{1}{R^2}\\,dA = \\frac{1}{R^2} \\cdot 4\\pi R^2 = 4\\pi = 2\\pi \\cdot 2 = 2\\pi\\chi(S^2)\\), since the Euler characteristic of the sphere is \\(\\chi(S^2) = 2\\). The theorem checks out.'
                },
                {
                    question: 'A flat piece of paper (\\(K = 0\\)) is rolled into a cone (minus the apex). Explain why geodesics on the cone, when unrolled, must become straight lines on the paper.',
                    hint: 'Unrolling is an isometry. What are geodesics of a flat surface?',
                    solution: 'Unrolling the cone to the plane is an isometry (it preserves the first fundamental form). Geodesics are intrinsic: they depend only on the metric. Geodesics on a plane are straight lines. Since the isometry maps geodesics to geodesics, every geodesic on the cone corresponds to a straight line on the unrolled flat sector.'
                },
                {
                    question: 'The helicoid \\(\\mathbf{r}(u,v) = (v\\cos u, v\\sin u, au)\\) and the catenoid \\(\\mathbf{r}(u,v) = (\\cosh v \\cos u, \\cosh v \\sin u, v)\\) are locally isometric. What does the Theorema Egregium tell you about their Gaussian curvatures?',
                    hint: 'Locally isometric surfaces have the same first fundamental form in appropriate coordinates.',
                    solution: 'The Theorema Egregium guarantees that locally isometric surfaces have the same Gaussian curvature at corresponding points. Therefore the helicoid and catenoid have the same \\(K\\) at corresponding points under the isometry. Both have \\(K < 0\\) (they are saddle-like), and their curvature functions agree pointwise. This is despite their very different appearances in \\(\\mathbb{R}^3\\).'
                },
                {
                    question: 'Does there exist a compact surface in \\(\\mathbb{R}^3\\) with \\(K \\leq 0\\) everywhere? If so, give an example. If not, explain why.',
                    hint: 'Think about the Gauss-Bonnet theorem. What constraints does \\(\\int K\\,dA = 2\\pi\\chi(S)\\) impose?',
                    solution: 'Yes: the torus has regions with \\(K > 0\\) (outer half) and \\(K < 0\\) (inner half), but their integral is zero (\\(\\chi(T^2) = 0\\)). However, a surface with \\(K < 0\\) <em>strictly everywhere</em> and \\(K = 0\\) nowhere must have \\(\\int K\\,dA < 0\\), requiring \\(\\chi(S) < 0\\). This is possible for surfaces of genus \\(g \\geq 2\\) (\\(\\chi = 2 - 2g < 0\\)). So yes, surfaces of genus \\(\\geq 2\\) can have \\(K < 0\\) everywhere. But for a sphere (\\(\\chi = 2\\)), \\(K \\leq 0\\) everywhere would give \\(\\int K\\,dA \\leq 0\\), contradicting \\(2\\pi \\cdot 2 = 4\\pi > 0\\). So no compact surface of genus 0 can have \\(K \\leq 0\\) everywhere.'
                }
            ]
        }
    ]
});
