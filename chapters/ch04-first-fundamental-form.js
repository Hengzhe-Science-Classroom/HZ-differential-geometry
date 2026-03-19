window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch04',
    number: 4,
    title: 'The First Fundamental Form',
    subtitle: 'Measuring lengths and areas on surfaces',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why We Need a Metric on Surfaces</h2>

<div class="env-block intuition">
    <div class="env-title">From Flat to Curved</div>
    <div class="env-body">
        <p>On a flat plane, measuring distances is straightforward: the Pythagorean theorem gives \\(ds^2 = dx^2 + dy^2\\). But on a curved surface, the coordinates \\((u,v)\\) parametrize points in a potentially distorted way. A small step of \\(du\\) in parameter space may correspond to a large or small displacement on the surface, depending on where you are and which direction you move.</p>
        <p>The first fundamental form is the tool that translates between parameter-space measurements and genuine geometric measurements on the surface.</p>
    </div>
</div>

<p>In the previous chapter we defined regular surfaces via parametrizations \\(\\mathbf{r}(u,v)\\). A parametrization is a map from a region in \\(\\mathbb{R}^2\\) into \\(\\mathbb{R}^3\\), and it carries its own coordinate system. But coordinate systems can be misleading: on a sphere parametrized by latitude and longitude, a degree of longitude near the equator corresponds to about 111 km, while near the poles it corresponds to almost nothing.</p>

<p>To do geometry on a surface (measure lengths of curves, areas of regions, angles between tangent vectors) we need a way to compute the <strong>inner product</strong> of tangent vectors expressed in local coordinates. This is precisely what the first fundamental form provides.</p>

<h3>The Tangent Plane and Inner Products</h3>

<p>Recall that at each point \\(p = \\mathbf{r}(u_0, v_0)\\) of a regular surface, the tangent plane \\(T_pS\\) is spanned by</p>
\\[
\\mathbf{r}_u = \\frac{\\partial \\mathbf{r}}{\\partial u}, \\quad \\mathbf{r}_v = \\frac{\\partial \\mathbf{r}}{\\partial v}.
\\]

<p>Any tangent vector \\(\\mathbf{w} \\in T_pS\\) can be written as \\(\\mathbf{w} = a\\,\\mathbf{r}_u + b\\,\\mathbf{r}_v\\) for some scalars \\(a, b\\). The natural inner product on \\(T_pS\\) is inherited from the ambient \\(\\mathbb{R}^3\\):</p>
\\[
\\langle \\mathbf{w}_1, \\mathbf{w}_2 \\rangle = \\mathbf{w}_1 \\cdot \\mathbf{w}_2
\\]
<p>where \\(\\cdot\\) is the standard dot product in \\(\\mathbb{R}^3\\). The first fundamental form encodes this inner product entirely in terms of the parameters \\((u,v)\\).</p>

<div class="env-block remark">
    <div class="env-title">Historical Context</div>
    <div class="env-body">
        <p>Gauss introduced the first fundamental form in his <em>Disquisitiones generales circa superficies curvas</em> (1827). He recognized that many geometric properties of a surface (lengths, areas, Gaussian curvature) depend only on this form, not on how the surface sits in space. This insight, formalized as the <em>Theorema Egregium</em>, is one of the most profound results in differential geometry.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-first-form-grid"></div>
`,
            visualizations: [
                {
                    id: 'viz-first-form-grid',
                    title: 'Metric Grid: Flat vs. Curved',
                    description: 'Compare a uniform parameter grid with its image on a surface. On a flat plane, equal parameter increments give equal distances. On a curved surface, the metric stretches and compresses the grid. Toggle between surfaces to see how the first fundamental form encodes this distortion.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 200, scale: 30
                        });

                        var surfaceType = 0; // 0=plane, 1=sphere, 2=saddle
                        var surfaceNames = ['Flat Plane', 'Sphere (top)', 'Saddle z=u\u00B2-v\u00B2'];

                        VizEngine.createButton(controls, 'Flat Plane', function() { surfaceType = 0; });
                        VizEngine.createButton(controls, 'Sphere', function() { surfaceType = 1; });
                        VizEngine.createButton(controls, 'Saddle', function() { surfaceType = 2; });

                        // Simple oblique 3D projection
                        function project3D(x, y, z) {
                            return [x - 0.35 * z, y + 0.25 * z];
                        }

                        function surfacePoint(u, v) {
                            if (surfaceType === 0) return [u, v, 0];
                            if (surfaceType === 1) {
                                // sphere top: x=cos(u)cos(v), y=sin(u)cos(v), z=sin(v)
                                var R = 3;
                                return [R * Math.cos(u) * Math.cos(v), R * Math.sin(v), R * Math.sin(u) * Math.cos(v)];
                            }
                            // saddle
                            return [u, v, 0.15 * (u * u - v * v)];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText(surfaceNames[surfaceType], viz.width / 2, 20, viz.colors.white, 15);

                            var N = 10;
                            var uMin = -3, uMax = 3, vMin = -3, vMax = 3;
                            if (surfaceType === 1) { uMin = -1.2; uMax = 1.2; vMin = -1.2; vMax = 1.2; }

                            // Draw grid lines along u
                            for (var j = 0; j <= N; j++) {
                                var v = vMin + (vMax - vMin) * j / N;
                                ctx.strokeStyle = (j === N / 2) ? viz.colors.teal + 'aa' : viz.colors.teal + '44';
                                ctx.lineWidth = (j === N / 2) ? 1.5 : 0.8;
                                ctx.beginPath();
                                for (var i = 0; i <= 40; i++) {
                                    var u = uMin + (uMax - uMin) * i / 40;
                                    var pt = surfacePoint(u, v);
                                    var p2 = project3D(pt[0], pt[2], pt[1]);
                                    var sx = viz.originX + p2[0] * viz.scale;
                                    var sy = viz.originY - p2[1] * viz.scale;
                                    if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }

                            // Draw grid lines along v
                            for (var i2 = 0; i2 <= N; i2++) {
                                var u2 = uMin + (uMax - uMin) * i2 / N;
                                ctx.strokeStyle = (i2 === N / 2) ? viz.colors.blue + 'aa' : viz.colors.blue + '44';
                                ctx.lineWidth = (i2 === N / 2) ? 1.5 : 0.8;
                                ctx.beginPath();
                                for (var j2 = 0; j2 <= 40; j2++) {
                                    var v2 = vMin + (vMax - vMin) * j2 / 40;
                                    var pt2 = surfacePoint(u2, v2);
                                    var p2b = project3D(pt2[0], pt2[2], pt2[1]);
                                    var sx2 = viz.originX + p2b[0] * viz.scale;
                                    var sy2 = viz.originY - p2b[1] * viz.scale;
                                    if (j2 === 0) ctx.moveTo(sx2, sy2); else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // Show a distance comparison
                            if (surfaceType === 1) {
                                viz.screenText('Near poles: grid cells shrink', viz.width / 2, viz.height - 40, viz.colors.orange, 12);
                                viz.screenText('Near equator: grid cells are roughly uniform', viz.width / 2, viz.height - 22, viz.colors.teal, 12);
                            } else if (surfaceType === 2) {
                                viz.screenText('Grid distorted by curvature of z = u\u00B2 - v\u00B2', viz.width / 2, viz.height - 30, viz.colors.orange, 12);
                            } else {
                                viz.screenText('Flat plane: grid cells are uniform (E=G=1, F=0)', viz.width / 2, viz.height - 30, viz.colors.teal, 12);
                            }
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: []
        },

        // ================================================================
        // SECTION 2: The First Fundamental Form
        // ================================================================
        {
            id: 'sec-metric',
            title: 'The First Fundamental Form',
            content: `
<h2>The First Fundamental Form</h2>

<div class="env-block definition">
    <div class="env-title">Definition 4.1 (First Fundamental Form)</div>
    <div class="env-body">
        <p>Let \\(S\\) be a regular surface and \\(p \\in S\\). The <strong>first fundamental form</strong> of \\(S\\) at \\(p\\) is the quadratic form \\(I_p: T_pS \\to \\mathbb{R}\\) defined by</p>
        \\[
        I_p(\\mathbf{w}) = \\langle \\mathbf{w}, \\mathbf{w} \\rangle = |\\mathbf{w}|^2
        \\]
        <p>for \\(\\mathbf{w} \\in T_pS\\), where \\(\\langle \\cdot, \\cdot \\rangle\\) is the inner product inherited from \\(\\mathbb{R}^3\\).</p>
    </div>
</div>

<p>If \\(\\mathbf{w} = a\\,\\mathbf{r}_u + b\\,\\mathbf{r}_v\\), then</p>
\\[
I_p(\\mathbf{w}) = \\langle a\\,\\mathbf{r}_u + b\\,\\mathbf{r}_v,\\; a\\,\\mathbf{r}_u + b\\,\\mathbf{r}_v \\rangle = a^2 \\langle \\mathbf{r}_u, \\mathbf{r}_u \\rangle + 2ab \\langle \\mathbf{r}_u, \\mathbf{r}_v \\rangle + b^2 \\langle \\mathbf{r}_v, \\mathbf{r}_v \\rangle.
\\]

<p>This motivates the definitions of the fundamental coefficients.</p>

<div class="env-block definition">
    <div class="env-title">Definition 4.2 (Metric Coefficients)</div>
    <div class="env-body">
        <p>The <strong>coefficients of the first fundamental form</strong> are</p>
        \\[
        E = \\langle \\mathbf{r}_u, \\mathbf{r}_u \\rangle, \\quad F = \\langle \\mathbf{r}_u, \\mathbf{r}_v \\rangle, \\quad G = \\langle \\mathbf{r}_v, \\mathbf{r}_v \\rangle.
        \\]
        <p>In terms of these coefficients, the first fundamental form is</p>
        \\[
        I_p(\\mathbf{w}) = E\\,a^2 + 2F\\,ab + G\\,b^2
        \\]
        <p>and the line element is</p>
        \\[
        ds^2 = E\\,du^2 + 2F\\,du\\,dv + G\\,dv^2.
        \\]
    </div>
</div>

<p>The matrix form of the first fundamental form is</p>
\\[
I_p(\\mathbf{w}) = \\begin{pmatrix} a & b \\end{pmatrix} \\begin{pmatrix} E & F \\\\ F & G \\end{pmatrix} \\begin{pmatrix} a \\\\ b \\end{pmatrix}.
\\]

<p>The matrix \\(\\begin{pmatrix} E & F \\\\ F & G \\end{pmatrix}\\) is called the <strong>metric tensor</strong> (or Riemannian metric in modern language). It is symmetric and positive definite at every point of a regular surface (since \\(\\mathbf{r}_u\\) and \\(\\mathbf{r}_v\\) are linearly independent, \\(EG - F^2 > 0\\)).</p>

<div class="env-block theorem">
    <div class="env-title">Proposition 4.1</div>
    <div class="env-body">
        <p>The first fundamental form is positive definite: \\(I_p(\\mathbf{w}) > 0\\) for all \\(\\mathbf{w} \\neq 0\\). Equivalently, \\(E > 0\\), \\(G > 0\\), and \\(EG - F^2 > 0\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: The Plane</div>
    <div class="env-body">
        <p>For the plane \\(\\mathbf{r}(u,v) = (u, v, 0)\\): \\(\\mathbf{r}_u = (1,0,0)\\), \\(\\mathbf{r}_v = (0,1,0)\\). So \\(E = 1\\), \\(F = 0\\), \\(G = 1\\), and \\(ds^2 = du^2 + dv^2\\). This is the standard Euclidean metric.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: The Sphere</div>
    <div class="env-body">
        <p>The sphere of radius \\(R\\) parametrized by \\(\\mathbf{r}(\\theta,\\phi) = (R\\sin\\theta\\cos\\phi,\\; R\\sin\\theta\\sin\\phi,\\; R\\cos\\theta)\\):</p>
        <ul>
            <li>\\(\\mathbf{r}_\\theta = (R\\cos\\theta\\cos\\phi,\\; R\\cos\\theta\\sin\\phi,\\; -R\\sin\\theta)\\)</li>
            <li>\\(\\mathbf{r}_\\phi = (-R\\sin\\theta\\sin\\phi,\\; R\\sin\\theta\\cos\\phi,\\; 0)\\)</li>
        </ul>
        <p>Computing: \\(E = R^2\\), \\(F = 0\\), \\(G = R^2\\sin^2\\theta\\). The line element is</p>
        \\[ds^2 = R^2\\,d\\theta^2 + R^2\\sin^2\\theta\\,d\\phi^2.\\]
        <p>Note that \\(G \\to 0\\) as \\(\\theta \\to 0\\) or \\(\\pi\\), reflecting the fact that longitude circles shrink to zero at the poles.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'For the cylinder \\(\\mathbf{r}(u,v) = (\\cos u, \\sin u, v)\\), compute \\(E, F, G\\) and write down the first fundamental form.',
                    hint: 'Compute \\(\\mathbf{r}_u\\) and \\(\\mathbf{r}_v\\) and take dot products.',
                    solution: '\\(\\mathbf{r}_u = (-\\sin u, \\cos u, 0)\\), \\(\\mathbf{r}_v = (0, 0, 1)\\). So \\(E = \\sin^2 u + \\cos^2 u = 1\\), \\(F = 0\\), \\(G = 1\\). The first fundamental form is \\(ds^2 = du^2 + dv^2\\), identical to the plane. This is why a cylinder can be "unrolled" to a flat sheet without distortion.'
                },
                {
                    question: 'Prove that \\(EG - F^2 > 0\\) for any regular surface.',
                    hint: 'Use the Cauchy-Schwarz inequality and the fact that \\(\\mathbf{r}_u\\) and \\(\\mathbf{r}_v\\) are linearly independent.',
                    solution: 'By Cauchy-Schwarz, \\(F^2 = \\langle \\mathbf{r}_u, \\mathbf{r}_v \\rangle^2 \\le |\\mathbf{r}_u|^2 |\\mathbf{r}_v|^2 = EG\\), with equality iff \\(\\mathbf{r}_u\\) and \\(\\mathbf{r}_v\\) are parallel. Since the surface is regular, \\(\\mathbf{r}_u \\times \\mathbf{r}_v \\neq 0\\), so they are not parallel, hence \\(EG - F^2 > 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: E, F, G Coefficients
        // ================================================================
        {
            id: 'sec-coefficients',
            title: 'E, F, G Coefficients',
            content: `
<h2>Computing E, F, G: Examples and Geometric Meaning</h2>

<p>The coefficients \\(E\\), \\(F\\), \\(G\\) carry direct geometric information:</p>

<div class="env-block remark">
    <div class="env-title">Geometric Interpretation</div>
    <div class="env-body">
        <ul>
            <li>\\(\\sqrt{E}\\) is the speed of the \\(u\\)-parameter curve (holding \\(v\\) constant)</li>
            <li>\\(\\sqrt{G}\\) is the speed of the \\(v\\)-parameter curve (holding \\(u\\) constant)</li>
            <li>\\(F = \\sqrt{EG}\\cos\\alpha\\), where \\(\\alpha\\) is the angle between the coordinate curves. The coordinate curves are orthogonal iff \\(F = 0\\).</li>
        </ul>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Cone</div>
    <div class="env-body">
        <p>Consider the cone \\(\\mathbf{r}(u,v) = (v\\cos u,\\; v\\sin u,\\; v)\\) for \\(v > 0\\).</p>
        <ul>
            <li>\\(\\mathbf{r}_u = (-v\\sin u,\\; v\\cos u,\\; 0)\\), so \\(E = v^2\\)</li>
            <li>\\(\\mathbf{r}_v = (\\cos u,\\; \\sin u,\\; 1)\\), so \\(G = 2\\)</li>
            <li>\\(F = \\mathbf{r}_u \\cdot \\mathbf{r}_v = -v\\sin u\\cos u + v\\cos u\\sin u + 0 = 0\\)</li>
        </ul>
        <p>The line element is \\(ds^2 = v^2\\,du^2 + 2\\,dv^2\\). The coordinate curves are orthogonal (\\(F=0\\)), and the circumferential "speed" grows linearly with \\(v\\) (distance from the apex).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Surface of Revolution</div>
    <div class="env-body">
        <p>A surface of revolution generated by rotating the profile curve \\((f(v), 0, g(v))\\) about the \\(z\\)-axis:</p>
        \\[\\mathbf{r}(u,v) = (f(v)\\cos u,\\; f(v)\\sin u,\\; g(v)).\\]
        <ul>
            <li>\\(\\mathbf{r}_u = (-f\\sin u,\\; f\\cos u,\\; 0)\\)</li>
            <li>\\(\\mathbf{r}_v = (f'\\cos u,\\; f'\\sin u,\\; g')\\)</li>
        </ul>
        <p>Therefore \\(E = f^2\\), \\(F = 0\\), \\(G = (f')^2 + (g')^2\\). If the profile is arc-length parametrized, \\((f')^2 + (g')^2 = 1\\), giving the elegant form \\(ds^2 = f(v)^2\\,du^2 + dv^2\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 4.3 (Orthogonal Parametrization)</div>
    <div class="env-body">
        <p>A parametrization is called <strong>orthogonal</strong> if \\(F = 0\\) everywhere. In this case the metric simplifies to \\(ds^2 = E\\,du^2 + G\\,dv^2\\) and the coordinate curves form a right-angle grid on the surface.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-efg-computation"></div>
`,
            visualizations: [
                {
                    id: 'viz-efg-computation',
                    title: 'E, F, G at a Point',
                    description: 'Drag the point on the surface to see how E, F, G change. The tangent vectors r_u and r_v are shown, along with the angle between them (determined by F). Observe how the metric coefficients vary across the surface.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 220, scale: 50
                        });

                        var dragPt = viz.addDraggable('pt', 0.5, 0.5, viz.colors.orange, 8);

                        var surfType = 0;
                        VizEngine.createButton(controls, 'Sphere', function() { surfType = 0; });
                        VizEngine.createButton(controls, 'Saddle', function() { surfType = 1; });
                        VizEngine.createButton(controls, 'Torus', function() { surfType = 2; });

                        function project3D(x, y, z) {
                            return [x * 0.9 - z * 0.3, y * 0.7 + z * 0.2];
                        }

                        function getSurface(u, v) {
                            if (surfType === 0) {
                                // Sphere R=2
                                var th = Math.PI * 0.15 + u * 0.7;
                                var ph = v * Math.PI * 0.8;
                                return [2 * Math.sin(th) * Math.cos(ph), 2 * Math.cos(th), 2 * Math.sin(th) * Math.sin(ph)];
                            } else if (surfType === 1) {
                                return [u, v, 0.3 * (u * u - v * v)];
                            } else {
                                // Torus
                                var R = 2, rr = 0.8;
                                var a = u * Math.PI, b = v * Math.PI;
                                return [(R + rr * Math.cos(b)) * Math.cos(a), rr * Math.sin(b), (R + rr * Math.cos(b)) * Math.sin(a)];
                            }
                        }

                        function computeEFG(u, v) {
                            var h = 0.001;
                            var p = getSurface(u, v);
                            var pu = getSurface(u + h, v);
                            var pv = getSurface(u, v + h);
                            var ru = [(pu[0] - p[0]) / h, (pu[1] - p[1]) / h, (pu[2] - p[2]) / h];
                            var rv = [(pv[0] - p[0]) / h, (pv[1] - p[1]) / h, (pv[2] - p[2]) / h];
                            var E = ru[0] * ru[0] + ru[1] * ru[1] + ru[2] * ru[2];
                            var F = ru[0] * rv[0] + ru[1] * rv[1] + ru[2] * rv[2];
                            var G = rv[0] * rv[0] + rv[1] * rv[1] + rv[2] * rv[2];
                            return { E: E, F: F, G: G, ru: ru, rv: rv, p: p };
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var names = ['Sphere (R=2)', 'Saddle z=0.3(u\u00B2-v\u00B2)', 'Torus (R=2, r=0.8)'];
                            viz.screenText(names[surfType], viz.width / 2, 18, viz.colors.white, 14);

                            // Draw surface wireframe
                            var uMin = -2, uMax = 2, vMin = -2, vMax = 2;
                            var N = 16, steps = 40;
                            for (var j = 0; j <= N; j++) {
                                var vv = vMin + (vMax - vMin) * j / N;
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                for (var i = 0; i <= steps; i++) {
                                    var uu = uMin + (uMax - uMin) * i / steps;
                                    var pt = getSurface(uu, vv);
                                    var p2 = project3D(pt[0], pt[1], pt[2]);
                                    var sx = viz.originX + p2[0] * viz.scale;
                                    var sy = viz.originY - p2[1] * viz.scale;
                                    if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }
                            for (var i2 = 0; i2 <= N; i2++) {
                                var uu2 = uMin + (uMax - uMin) * i2 / N;
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                for (var j2 = 0; j2 <= steps; j2++) {
                                    var vv2 = vMin + (vMax - vMin) * j2 / steps;
                                    var pt2 = getSurface(uu2, vv2);
                                    var p2b = project3D(pt2[0], pt2[1], pt2[2]);
                                    var sx2 = viz.originX + p2b[0] * viz.scale;
                                    var sy2 = viz.originY - p2b[1] * viz.scale;
                                    if (j2 === 0) ctx.moveTo(sx2, sy2); else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // Compute metric at dragged point
                            var u0 = dragPt.x, v0 = dragPt.y;
                            var info = computeEFG(u0, v0);
                            var p3 = project3D(info.p[0], info.p[1], info.p[2]);
                            var spx = viz.originX + p3[0] * viz.scale;
                            var spy = viz.originY - p3[1] * viz.scale;

                            // Draw tangent vectors
                            var sc = 0.4;
                            var ruProj = project3D(info.ru[0] * sc, info.ru[1] * sc, info.ru[2] * sc);
                            var rvProj = project3D(info.rv[0] * sc, info.rv[1] * sc, info.rv[2] * sc);

                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.moveTo(spx, spy);
                            ctx.lineTo(spx + ruProj[0] * viz.scale, spy - ruProj[1] * viz.scale);
                            ctx.stroke();
                            viz.screenText('r_u', spx + ruProj[0] * viz.scale + 8, spy - ruProj[1] * viz.scale, viz.colors.blue, 12, 'left');

                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.moveTo(spx, spy);
                            ctx.lineTo(spx + rvProj[0] * viz.scale, spy - rvProj[1] * viz.scale);
                            ctx.stroke();
                            viz.screenText('r_v', spx + rvProj[0] * viz.scale + 8, spy - rvProj[1] * viz.scale, viz.colors.teal, 12, 'left');

                            // Point
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(spx, spy, 5, 0, Math.PI * 2);
                            ctx.fill();

                            // Display E, F, G
                            var angle = Math.acos(Math.max(-1, Math.min(1, info.F / Math.sqrt(info.E * info.G)))) * 180 / Math.PI;
                            var boxY = viz.height - 80;
                            ctx.fillStyle = viz.colors.bg + 'cc';
                            ctx.fillRect(10, boxY, 540, 70);
                            viz.screenText('E = ' + info.E.toFixed(3) + '    F = ' + info.F.toFixed(3) + '    G = ' + info.G.toFixed(3), viz.width / 2, boxY + 18, viz.colors.white, 14);
                            viz.screenText('EG - F\u00B2 = ' + (info.E * info.G - info.F * info.F).toFixed(4), viz.width / 2, boxY + 38, viz.colors.green, 12);
                            viz.screenText('Angle between coordinate curves: ' + angle.toFixed(1) + '\u00B0', viz.width / 2, boxY + 56, viz.colors.orange, 12);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(E, F, G\\) for the paraboloid \\(\\mathbf{r}(u,v) = (u, v, u^2 + v^2)\\).',
                    hint: 'Find \\(\\mathbf{r}_u = (1, 0, 2u)\\) and \\(\\mathbf{r}_v = (0, 1, 2v)\\), then take dot products.',
                    solution: '\\(E = 1 + 4u^2\\), \\(F = 4uv\\), \\(G = 1 + 4v^2\\). Note \\(F \\neq 0\\) in general, so this parametrization is not orthogonal (except along the axes \\(u = 0\\) or \\(v = 0\\)).'
                },
                {
                    question: 'For a surface of revolution \\(\\mathbf{r}(u,v) = (f(v)\\cos u, f(v)\\sin u, g(v))\\), show that \\(F = 0\\) always. What does this mean geometrically?',
                    hint: 'Compute \\(\\mathbf{r}_u \\cdot \\mathbf{r}_v\\) directly.',
                    solution: '\\(\\mathbf{r}_u = (-f\\sin u, f\\cos u, 0)\\) and \\(\\mathbf{r}_v = (f\'\\cos u, f\'\\sin u, g\')\\). Then \\(F = -ff\'\\sin u\\cos u + ff\'\\cos u\\sin u + 0 = 0\\). Geometrically, the meridians (\\(u\\) = const) and parallels (\\(v\\) = const) always meet at right angles.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Lengths of Curves on Surfaces
        // ================================================================
        {
            id: 'sec-lengths',
            title: 'Lengths of Curves on Surfaces',
            content: `
<h2>Measuring Lengths via the First Fundamental Form</h2>

<p>A curve on a surface \\(S\\) is given by \\(\\alpha(t) = \\mathbf{r}(u(t), v(t))\\), where \\((u(t), v(t))\\) is a curve in the parameter domain. The velocity vector is</p>
\\[
\\alpha'(t) = u'(t)\\,\\mathbf{r}_u + v'(t)\\,\\mathbf{r}_v.
\\]

<p>The speed (length of the velocity vector) is</p>
\\[
|\\alpha'(t)| = \\sqrt{I_p(\\alpha')} = \\sqrt{E\\,u'^2 + 2F\\,u'v' + G\\,v'^2}.
\\]

<div class="env-block theorem">
    <div class="env-title">Theorem 4.1 (Arc Length on a Surface)</div>
    <div class="env-body">
        <p>The length of a curve \\(\\alpha(t) = \\mathbf{r}(u(t), v(t))\\) for \\(t \\in [a, b]\\) is</p>
        \\[
        L = \\int_a^b \\sqrt{E\\,u'^2 + 2F\\,u'v' + G\\,v'^2}\\;dt.
        \\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Circle of Latitude on a Sphere</div>
    <div class="env-body">
        <p>On the unit sphere with \\(ds^2 = d\\theta^2 + \\sin^2\\theta\\,d\\phi^2\\), the circle of latitude \\(\\theta = \\theta_0\\) is given by \\(\\theta(t) = \\theta_0\\), \\(\\phi(t) = t\\), \\(t \\in [0, 2\\pi]\\). Then \\(\\theta' = 0\\), \\(\\phi' = 1\\), and</p>
        \\[L = \\int_0^{2\\pi} \\sqrt{0 + \\sin^2\\theta_0 \\cdot 1}\\;dt = 2\\pi\\sin\\theta_0.\\]
        <p>At the equator (\\(\\theta_0 = \\pi/2\\)), \\(L = 2\\pi\\). At the poles (\\(\\theta_0 = 0\\) or \\(\\pi\\)), \\(L = 0\\). This confirms our geometric intuition.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Helix on a Cylinder</div>
    <div class="env-body">
        <p>On the cylinder \\(\\mathbf{r}(u,v) = (\\cos u, \\sin u, v)\\), the helix \\(u(t) = t\\), \\(v(t) = bt\\) for \\(t \\in [0, 2\\pi]\\) has length</p>
        \\[L = \\int_0^{2\\pi} \\sqrt{1 \\cdot 1 + 0 + 1 \\cdot b^2}\\;dt = 2\\pi\\sqrt{1 + b^2}.\\]
        <p>Since the cylinder has the same metric as the plane, this is the same as the length of the line from \\((0,0)\\) to \\((2\\pi, 2\\pi b)\\) in the plane.</p>
    </div>
</div>

<h3>Angle Between Curves</h3>

<p>If two curves on \\(S\\) intersect at \\(p\\) with tangent vectors \\(\\mathbf{w}_1 = a_1\\mathbf{r}_u + b_1\\mathbf{r}_v\\) and \\(\\mathbf{w}_2 = a_2\\mathbf{r}_u + b_2\\mathbf{r}_v\\), their angle \\(\\theta\\) satisfies</p>
\\[
\\cos\\theta = \\frac{\\langle \\mathbf{w}_1, \\mathbf{w}_2 \\rangle}{|\\mathbf{w}_1|\\,|\\mathbf{w}_2|} = \\frac{Ea_1a_2 + F(a_1b_2 + a_2b_1) + Gb_1b_2}{\\sqrt{Ea_1^2 + 2Fa_1b_1 + Gb_1^2}\\;\\sqrt{Ea_2^2 + 2Fa_2b_2 + Gb_2^2}}.
\\]

<div class="viz-placeholder" data-viz="viz-curve-on-surface"></div>
`,
            visualizations: [
                {
                    id: 'viz-curve-on-surface',
                    title: 'Curve Length on a Surface',
                    description: 'A curve on a surface, with its arc length computed using the first fundamental form. Adjust the curve path and surface to see how the metric affects length. The integrand sqrt(E u\'^2 + 2F u\'v\' + G v\'^2) is displayed at each point.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 210, scale: 45
                        });

                        var pitch = 0.5;
                        VizEngine.createSlider(controls, 'Helix pitch', 0, 2.0, pitch, 0.1, function(v) { pitch = v; });

                        var surfIdx = 0;
                        VizEngine.createButton(controls, 'Cylinder', function() { surfIdx = 0; });
                        VizEngine.createButton(controls, 'Sphere', function() { surfIdx = 1; });

                        function project3D(x, y, z) {
                            return [x * 0.85 - z * 0.35, y * 0.6 + z * 0.3];
                        }

                        function getSurface(u, v) {
                            if (surfIdx === 0) {
                                return [Math.cos(u), Math.sin(u), v];
                            }
                            // Sphere
                            var th = 0.3 + v * 0.9;
                            var ph = u;
                            return [1.5 * Math.sin(th) * Math.cos(ph), 1.5 * Math.cos(th), 1.5 * Math.sin(th) * Math.sin(ph)];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var sNames = ['Cylinder', 'Sphere (R=1.5)'];
                            viz.screenText(sNames[surfIdx], viz.width / 2, 16, viz.colors.white, 14);

                            // Draw surface wireframe
                            var uMin = 0, uMax = 2 * Math.PI, vMin = -2, vMax = 2;
                            if (surfIdx === 1) { vMin = 0; vMax = 2; }
                            var N = 12, steps = 50;
                            for (var j = 0; j <= N; j++) {
                                var vv = vMin + (vMax - vMin) * j / N;
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                for (var ii = 0; ii <= steps; ii++) {
                                    var uu = uMin + (uMax - uMin) * ii / steps;
                                    var pt = getSurface(uu, vv);
                                    var p2 = project3D(pt[0], pt[1], pt[2]);
                                    var sx = viz.originX + p2[0] * viz.scale;
                                    var sy = viz.originY - p2[1] * viz.scale;
                                    if (ii === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }
                            for (var i2 = 0; i2 <= N; i2++) {
                                var uu2 = uMin + (uMax - uMin) * i2 / N;
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                for (var j2 = 0; j2 <= steps; j2++) {
                                    var vv2 = vMin + (vMax - vMin) * j2 / steps;
                                    var pt2 = getSurface(uu2, vv2);
                                    var p2b = project3D(pt2[0], pt2[1], pt2[2]);
                                    var sx2 = viz.originX + p2b[0] * viz.scale;
                                    var sy2 = viz.originY - p2b[1] * viz.scale;
                                    if (j2 === 0) ctx.moveTo(sx2, sy2); else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // Draw the curve
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            var lengthAccum = 0;
                            var prevPt = null;
                            var nSteps = 200;
                            for (var k = 0; k <= nSteps; k++) {
                                var t = k / nSteps;
                                var u, v;
                                if (surfIdx === 0) {
                                    u = t * 2 * Math.PI;
                                    v = pitch * t * 2 * Math.PI - (pitch * Math.PI);
                                } else {
                                    u = t * 2 * Math.PI;
                                    v = 0.3 + pitch * t;
                                }
                                var pt3 = getSurface(u, v);
                                var p3 = project3D(pt3[0], pt3[1], pt3[2]);
                                var sx3 = viz.originX + p3[0] * viz.scale;
                                var sy3 = viz.originY - p3[1] * viz.scale;
                                if (k === 0) ctx.moveTo(sx3, sy3); else ctx.lineTo(sx3, sy3);
                                if (prevPt) {
                                    var dx = pt3[0] - prevPt[0], dy = pt3[1] - prevPt[1], dz = pt3[2] - prevPt[2];
                                    lengthAccum += Math.sqrt(dx * dx + dy * dy + dz * dz);
                                }
                                prevPt = pt3;
                            }
                            ctx.stroke();

                            // Display length
                            viz.screenText('Arc length L = ' + lengthAccum.toFixed(3), viz.width / 2, viz.height - 40, viz.colors.orange, 14);
                            if (surfIdx === 0) {
                                var exact = 2 * Math.PI * Math.sqrt(1 + pitch * pitch);
                                viz.screenText('Exact: 2\u03C0\u221A(1+b\u00B2) = ' + exact.toFixed(3), viz.width / 2, viz.height - 20, viz.colors.teal, 12);
                            }
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the length of the curve \\(\\alpha(t) = (t, t, t^2 + t^2)\\) on the paraboloid \\(z = u^2 + v^2\\) for \\(t \\in [0, 1]\\). You may leave your answer as an integral.',
                    hint: 'On this surface \\(E = 1 + 4u^2\\), \\(F = 4uv\\), \\(G = 1 + 4v^2\\). The curve has \\(u(t) = t\\), \\(v(t) = t\\), so \\(u\' = v\' = 1\\).',
                    solution: '\\(L = \\int_0^1 \\sqrt{(1+4t^2) + 2(4t^2) + (1+4t^2)}\\;dt = \\int_0^1 \\sqrt{2 + 16t^2}\\;dt = \\sqrt{2}\\int_0^1 \\sqrt{1 + 8t^2}\\;dt\\). This evaluates to approximately 2.296.'
                },
                {
                    question: 'On the unit sphere, find the length of the spiral \\(\\theta(t) = t\\), \\(\\phi(t) = ct\\) for \\(t \\in [0, \\pi/2]\\). For what value of \\(c\\) is the spiral twice as long as the meridian (\\(c = 0\\) case)?',
                    hint: 'The speed is \\(\\sqrt{1 + c^2\\sin^2 t}\\). The meridian has length \\(\\pi/2\\).',
                    solution: 'The meridian (\\(c=0\\)) has length \\(\\pi/2\\). We need \\(\\int_0^{\\pi/2}\\sqrt{1+c^2\\sin^2 t}\\;dt = \\pi\\). This is an elliptic integral; numerically \\(c \\approx 3.34\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Area of Regions
        // ================================================================
        {
            id: 'sec-areas',
            title: 'Area of Regions',
            content: `
<h2>Computing Areas via the First Fundamental Form</h2>

<p>The infinitesimal area element on a surface can be derived from the parallelogram spanned by \\(\\mathbf{r}_u\\,du\\) and \\(\\mathbf{r}_v\\,dv\\). The area of a parallelogram is the magnitude of the cross product of its edges:</p>
\\[
dA = |\\mathbf{r}_u \\times \\mathbf{r}_v|\\;du\\,dv.
\\]

<p>A classical identity from linear algebra gives</p>
\\[
|\\mathbf{r}_u \\times \\mathbf{r}_v|^2 = |\\mathbf{r}_u|^2|\\mathbf{r}_v|^2 - (\\mathbf{r}_u \\cdot \\mathbf{r}_v)^2 = EG - F^2.
\\]

<div class="env-block theorem">
    <div name="env-title">Theorem 4.2 (Surface Area)</div>
    <div class="env-body">
        <p>The area of a region \\(R\\) on a surface \\(S\\), parametrized by \\(\\mathbf{r}: D \\to S\\), is</p>
        \\[
        A(R) = \\iint_D \\sqrt{EG - F^2}\\;du\\,dv = \\iint_D |\\mathbf{r}_u \\times \\mathbf{r}_v|\\;du\\,dv.
        \\]
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Geometric Meaning of \\(\\sqrt{EG - F^2}\\)</div>
    <div class="env-body">
        <p>The quantity \\(\\sqrt{EG-F^2}\\) is the <strong>area magnification factor</strong>: it tells you how much a unit square in parameter space is stretched or compressed when mapped onto the surface. When \\(F = 0\\), this simplifies to \\(\\sqrt{EG} = \\sqrt{E}\\,\\sqrt{G}\\), the product of the two coordinate-direction stretch factors.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Area of the Sphere</div>
    <div class="env-body">
        <p>For the unit sphere: \\(E = 1\\), \\(F = 0\\), \\(G = \\sin^2\\theta\\). So \\(\\sqrt{EG - F^2} = \\sin\\theta\\), and</p>
        \\[A = \\int_0^{2\\pi}\\int_0^{\\pi} \\sin\\theta\\;d\\theta\\,d\\phi = 2\\pi \\cdot [-\\cos\\theta]_0^\\pi = 2\\pi \\cdot 2 = 4\\pi.\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Area of a Zone on a Sphere</div>
    <div class="env-body">
        <p>The area of the spherical zone between latitudes \\(\\theta_1\\) and \\(\\theta_2\\) (with \\(0 \\le \\theta_1 < \\theta_2 \\le \\pi\\)) is</p>
        \\[A = \\int_0^{2\\pi}\\int_{\\theta_1}^{\\theta_2} \\sin\\theta\\;d\\theta\\,d\\phi = 2\\pi(\\cos\\theta_1 - \\cos\\theta_2).\\]
        <p>Remarkably, this depends only on the <em>height difference</em> \\(\\cos\\theta_1 - \\cos\\theta_2\\), not on the particular latitudes. Archimedes knew this: the area of a spherical zone equals the area of the corresponding cylindrical zone.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-area-element"></div>
`,
            visualizations: [
                {
                    id: 'viz-area-element',
                    title: 'The Infinitesimal Area Element',
                    description: 'Visualize the parallelogram formed by r_u du and r_v dv at a point on the surface. Its area is sqrt(EG-F^2) du dv. Drag the point to see how the area element changes across the surface.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 55
                        });

                        var dragPt = viz.addDraggable('pt', 0.8, 0.8, viz.colors.orange, 8);

                        function project3D(x, y, z) {
                            return [x * 0.85 - z * 0.35, y * 0.6 + z * 0.25];
                        }

                        // Sphere
                        function getSurface(u, v) {
                            var R = 2;
                            var th = 0.2 + u * 0.8;
                            var ph = v * Math.PI * 0.9;
                            return [R * Math.sin(th) * Math.cos(ph), R * Math.cos(th), R * Math.sin(th) * Math.sin(ph)];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            viz.screenText('Area Element on a Sphere', viz.width / 2, 16, viz.colors.white, 14);

                            // Wireframe
                            var N = 14, steps = 40;
                            var uMin = -2, uMax = 2, vMin = -2, vMax = 2;
                            for (var j = 0; j <= N; j++) {
                                var vv = vMin + (vMax - vMin) * j / N;
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                for (var i = 0; i <= steps; i++) {
                                    var uu = uMin + (uMax - uMin) * i / steps;
                                    var pt = getSurface(uu, vv);
                                    var p2 = project3D(pt[0], pt[1], pt[2]);
                                    var sx = viz.originX + p2[0] * viz.scale;
                                    var sy = viz.originY - p2[1] * viz.scale;
                                    if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }
                            for (var i2 = 0; i2 <= N; i2++) {
                                var uu2 = uMin + (uMax - uMin) * i2 / N;
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                for (var j2 = 0; j2 <= steps; j2++) {
                                    var vv2 = vMin + (vMax - vMin) * j2 / steps;
                                    var pt2 = getSurface(uu2, vv2);
                                    var p2b = project3D(pt2[0], pt2[1], pt2[2]);
                                    var sx2 = viz.originX + p2b[0] * viz.scale;
                                    var sy2 = viz.originY - p2b[1] * viz.scale;
                                    if (j2 === 0) ctx.moveTo(sx2, sy2); else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // Compute at drag point
                            var u0 = dragPt.x, v0 = dragPt.y;
                            var h = 0.001;
                            var p0 = getSurface(u0, v0);
                            var pu = getSurface(u0 + h, v0);
                            var pv = getSurface(u0, v0 + h);
                            var ru = [(pu[0] - p0[0]) / h, (pu[1] - p0[1]) / h, (pu[2] - p0[2]) / h];
                            var rv = [(pv[0] - p0[0]) / h, (pv[1] - p0[1]) / h, (pv[2] - p0[2]) / h];
                            var E = ru[0] * ru[0] + ru[1] * ru[1] + ru[2] * ru[2];
                            var F = ru[0] * rv[0] + ru[1] * rv[1] + ru[2] * rv[2];
                            var G = rv[0] * rv[0] + rv[1] * rv[1] + rv[2] * rv[2];
                            var areaFactor = Math.sqrt(Math.max(0, E * G - F * F));

                            // Draw parallelogram
                            var sc = 0.25;
                            var p0Proj = project3D(p0[0], p0[1], p0[2]);
                            var ruSc = [ru[0] * sc, ru[1] * sc, ru[2] * sc];
                            var rvSc = [rv[0] * sc, rv[1] * sc, rv[2] * sc];

                            var corners = [
                                project3D(p0[0], p0[1], p0[2]),
                                project3D(p0[0] + ruSc[0], p0[1] + ruSc[1], p0[2] + ruSc[2]),
                                project3D(p0[0] + ruSc[0] + rvSc[0], p0[1] + ruSc[1] + rvSc[1], p0[2] + ruSc[2] + rvSc[2]),
                                project3D(p0[0] + rvSc[0], p0[1] + rvSc[1], p0[2] + rvSc[2])
                            ];

                            ctx.fillStyle = viz.colors.purple + '44';
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var c = 0; c < 4; c++) {
                                var cx = viz.originX + corners[c][0] * viz.scale;
                                var cy = viz.originY - corners[c][1] * viz.scale;
                                if (c === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
                            }
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();

                            // Tangent vectors
                            var spx = viz.originX + p0Proj[0] * viz.scale;
                            var spy = viz.originY - p0Proj[1] * viz.scale;
                            var ruP = project3D(ruSc[0], ruSc[1], ruSc[2]);
                            var rvP = project3D(rvSc[0], rvSc[1], rvSc[2]);

                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(spx, spy);
                            ctx.lineTo(spx + ruP[0] * viz.scale, spy - ruP[1] * viz.scale); ctx.stroke();
                            viz.screenText('r_u du', spx + ruP[0] * viz.scale + 6, spy - ruP[1] * viz.scale - 6, viz.colors.blue, 11, 'left');

                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(spx, spy);
                            ctx.lineTo(spx + rvP[0] * viz.scale, spy - rvP[1] * viz.scale); ctx.stroke();
                            viz.screenText('r_v dv', spx + rvP[0] * viz.scale + 6, spy - rvP[1] * viz.scale + 10, viz.colors.teal, 11, 'left');

                            // Point
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(spx, spy, 5, 0, Math.PI * 2); ctx.fill();

                            // Info
                            viz.screenText('\u221A(EG - F\u00B2) = ' + areaFactor.toFixed(3), viz.width / 2, viz.height - 45, viz.colors.purple, 14);
                            viz.screenText('dA = ' + areaFactor.toFixed(3) + ' du dv', viz.width / 2, viz.height - 25, viz.colors.white, 13);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the area of the piece of the paraboloid \\(z = x^2 + y^2\\) over the disk \\(x^2 + y^2 \\le 1\\). (Hint: use polar coordinates \\(u = r\\), \\(v = \\theta\\).)',
                    hint: 'Parametrize as \\(\\mathbf{r}(r,\\theta) = (r\\cos\\theta, r\\sin\\theta, r^2)\\). Compute \\(|\\mathbf{r}_r \\times \\mathbf{r}_\\theta| = r\\sqrt{1 + 4r^2}\\).',
                    solution: '\\(A = \\int_0^{2\\pi}\\int_0^1 r\\sqrt{1 + 4r^2}\\;dr\\,d\\theta = 2\\pi \\cdot \\frac{1}{12}[(1+4r^2)^{3/2}]_0^1 = \\frac{\\pi}{6}(5\\sqrt{5} - 1) \\approx 5.33\\).'
                },
                {
                    question: 'Show that the area of the torus \\(\\mathbf{r}(u,v) = ((R + r\\cos v)\\cos u, (R + r\\cos v)\\sin u, r\\sin v)\\) is \\(4\\pi^2 Rr\\).',
                    hint: 'Compute \\(\\sqrt{EG - F^2}\\) and integrate over \\([0, 2\\pi] \\times [0, 2\\pi]\\).',
                    solution: '\\(\\mathbf{r}_u = (-(R+r\\cos v)\\sin u, (R+r\\cos v)\\cos u, 0)\\), \\(\\mathbf{r}_v = (-r\\sin v\\cos u, -r\\sin v\\sin u, r\\cos v)\\). Then \\(E = (R+r\\cos v)^2\\), \\(F = 0\\), \\(G = r^2\\), so \\(\\sqrt{EG-F^2} = r(R+r\\cos v)\\). Integrating: \\(A = \\int_0^{2\\pi}\\int_0^{2\\pi} r(R+r\\cos v)\\;du\\,dv = 2\\pi r \\int_0^{2\\pi}(R + r\\cos v)dv = 2\\pi r \\cdot 2\\pi R = 4\\pi^2 Rr\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Isometries, Conformal Maps, and the Bridge Forward
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Isometries & Conformal Maps',
            content: `
<h2>Isometries, Conformal Maps, and Looking Ahead</h2>

<p>The first fundamental form is the key to a fundamental classification question: when are two surfaces "the same" from a metric standpoint?</p>

<div class="env-block definition">
    <div class="env-title">Definition 4.4 (Isometry)</div>
    <div class="env-body">
        <p>A diffeomorphism \\(\\varphi: S_1 \\to S_2\\) between two surfaces is an <strong>isometry</strong> if it preserves the first fundamental form:</p>
        \\[I_p(\\mathbf{w}) = I_{\\varphi(p)}(d\\varphi_p(\\mathbf{w}))\\]
        <p>for all \\(p \\in S_1\\) and \\(\\mathbf{w} \\in T_pS_1\\). Equivalently, \\(\\varphi\\) preserves lengths of all curves.</p>
    </div>
</div>

<p>The cylinder and the plane are isometric: unrolling a cylinder preserves all distances and areas. However, the sphere and the plane are <em>not</em> isometric. No map from the sphere to the plane can preserve all distances simultaneously. This is the fundamental obstruction behind all map projections.</p>

<div class="env-block definition">
    <div class="env-title">Definition 4.5 (Conformal Map)</div>
    <div class="env-body">
        <p>A diffeomorphism \\(\\varphi: S_1 \\to S_2\\) is <strong>conformal</strong> if it preserves angles but not necessarily lengths. Equivalently, the first fundamental form of \\(S_2\\) pulled back to \\(S_1\\) is a scalar multiple of the first fundamental form of \\(S_1\\):</p>
        \\[I_{\\varphi(p)}(d\\varphi_p(\\mathbf{w})) = \\lambda(p)^2 \\, I_p(\\mathbf{w})\\]
        <p>for some positive function \\(\\lambda: S_1 \\to \\mathbb{R}^+\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Mercator Projection</div>
    <div class="env-body">
        <p>The Mercator projection maps the sphere to the plane conformally (preserving angles) but distorts areas. Near the poles, the area magnification becomes extreme: Greenland appears as large as Africa on a Mercator map, though its true area is about 1/14th of Africa's.</p>
        <p>The Mercator metric on the plane is \\(ds^2 = \\sec^2\\theta\\,(d\\theta^2 + d\\phi^2)\\), which is \\(\\sec^2\\theta\\) times the flat metric. The conformal factor \\(\\lambda = \\sec\\theta\\) blows up at the poles.</p>
    </div>
</div>

<h3>Properties Determined by the First Fundamental Form</h3>

<p>Any quantity that can be expressed purely in terms of \\(E, F, G\\) and their derivatives is called an <strong>intrinsic</strong> property of the surface. Such properties are preserved by isometries. The remarkable Theorema Egregium (Chapter 8) shows that Gaussian curvature is intrinsic, even though it is defined extrinsically using the second fundamental form.</p>

<p>Intrinsic properties include:</p>
<ul>
    <li>Lengths of curves</li>
    <li>Areas of regions</li>
    <li>Angles between curves</li>
    <li>Gaussian curvature</li>
    <li>Geodesics (shortest paths on the surface)</li>
</ul>

<p>The second fundamental form (Chapter 5) captures how the surface bends in space, an <em>extrinsic</em> property. The interplay between these two forms is the heart of classical differential geometry.</p>

<div class="viz-placeholder" data-viz="viz-isometry"></div>

<div class="viz-placeholder" data-viz="viz-conformal-mercator"></div>
`,
            visualizations: [
                {
                    id: 'viz-isometry',
                    title: 'Isometry: Unrolling a Cylinder',
                    description: 'Watch a cylinder unroll into a flat plane. The grid cells maintain their shape and size throughout the deformation, demonstrating that the cylinder and plane are isometric. Distances, areas, and angles are all preserved.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 200, scale: 50
                        });

                        var t = 0;
                        var animating = true;
                        VizEngine.createSlider(controls, 'Unroll', 0, 1, 0, 0.01, function(v) { t = v; animating = false; });
                        VizEngine.createButton(controls, 'Animate', function() { animating = true; t = 0; });

                        function project3D(x, y, z) {
                            return [x * 0.8 - z * 0.4, y * 0.65 + z * 0.2];
                        }

                        function draw(time) {
                            viz.clear();
                            var ctx = viz.ctx;

                            if (animating) {
                                t = (Math.sin(time * 0.001) + 1) / 2;
                            }

                            viz.screenText('Cylinder \u2194 Plane Isometry (t=' + t.toFixed(2) + ')', viz.width / 2, 16, viz.colors.white, 14);

                            // Interpolate between cylinder and flat
                            var N = 10;
                            var uMin = 0, uMax = 2 * Math.PI, vMin = -1.5, vMax = 1.5;

                            function getPoint(u, v) {
                                // Cylinder: (cos u, sin u, v), flat: (u - pi, 0, v)
                                var cx = Math.cos(u), cy = Math.sin(u);
                                var fx = u - Math.PI, fy = 0;
                                var x = cx * (1 - t) + fx * t;
                                var y = cy * (1 - t) + fy * t;
                                return [x, v, y];
                            }

                            // u-lines
                            for (var j = 0; j <= N; j++) {
                                var vv = vMin + (vMax - vMin) * j / N;
                                ctx.strokeStyle = viz.colors.blue + '66';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                for (var i = 0; i <= 50; i++) {
                                    var uu = uMin + (uMax - uMin) * i / 50;
                                    var pt = getPoint(uu, vv);
                                    var p2 = project3D(pt[0], pt[1], pt[2]);
                                    var sx = viz.originX + p2[0] * viz.scale;
                                    var sy = viz.originY - p2[1] * viz.scale;
                                    if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }

                            // v-lines
                            for (var i2 = 0; i2 <= N; i2++) {
                                var uu2 = uMin + (uMax - uMin) * i2 / N;
                                ctx.strokeStyle = viz.colors.teal + '66';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                for (var j2 = 0; j2 <= 30; j2++) {
                                    var vv2 = vMin + (vMax - vMin) * j2 / 30;
                                    var pt2 = getPoint(uu2, vv2);
                                    var p2b = project3D(pt2[0], pt2[1], pt2[2]);
                                    var sx2 = viz.originX + p2b[0] * viz.scale;
                                    var sy2 = viz.originY - p2b[1] * viz.scale;
                                    if (j2 === 0) ctx.moveTo(sx2, sy2); else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // Highlight a single cell to show preserved shape
                            var cellU = Math.PI * 0.4, cellV = 0;
                            var du = 2 * Math.PI / N, dv = (vMax - vMin) / N;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            // Four edges of one cell
                            var corners = [
                                getPoint(cellU, cellV),
                                getPoint(cellU + du, cellV),
                                getPoint(cellU + du, cellV + dv),
                                getPoint(cellU, cellV + dv)
                            ];
                            for (var c = 0; c <= 4; c++) {
                                var cc = corners[c % 4];
                                var p3 = project3D(cc[0], cc[1], cc[2]);
                                var scx = viz.originX + p3[0] * viz.scale;
                                var scy = viz.originY - p3[1] * viz.scale;
                                if (c === 0) ctx.moveTo(scx, scy); else ctx.lineTo(scx, scy);
                            }
                            ctx.stroke();

                            viz.screenText('Grid cell shape & size preserved (isometry)', viz.width / 2, viz.height - 22, viz.colors.orange, 12);
                            viz.screenText('E = G = 1, F = 0 in both parametrizations', viz.width / 2, viz.height - 42, viz.colors.teal, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-conformal-mercator',
                    title: 'Conformal Map: Mercator Projection',
                    description: 'The Mercator projection maps the sphere to a rectangle, preserving angles but grossly distorting areas near the poles. Compare the true sizes of grid cells on the sphere with their images on the map.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var showAreas = true;
                        VizEngine.createButton(controls, 'Toggle area circles', function() { showAreas = !showAreas; });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var leftW = 240, rightW = 280;
                            var topY = 40, botY = 350;
                            var sphereCX = 130, sphereCY = 195, sphereR = 110;

                            // Labels
                            viz.screenText('Globe', sphereCX, 22, viz.colors.white, 14);
                            viz.screenText('Mercator Projection', leftW + rightW / 2 + 20, 22, viz.colors.white, 14);

                            // Draw sphere (orthographic projection)
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.arc(sphereCX, sphereCY, sphereR, 0, Math.PI * 2);
                            ctx.stroke();

                            // Draw latitude/longitude lines on sphere
                            var nLat = 8, nLon = 12;
                            for (var i = 1; i < nLat; i++) {
                                var th = Math.PI * i / nLat;
                                var r = sphereR * Math.sin(th);
                                var cy = sphereCY - sphereR * Math.cos(th);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.7;
                                ctx.beginPath();
                                ctx.ellipse(sphereCX, cy, r, r * 0.3, 0, 0, Math.PI * 2);
                                ctx.stroke();
                            }
                            for (var j = 0; j < nLon; j++) {
                                var ph = 2 * Math.PI * j / nLon;
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.7;
                                ctx.beginPath();
                                for (var k = 0; k <= 40; k++) {
                                    var thk = Math.PI * k / 40;
                                    var x3 = Math.sin(thk) * Math.cos(ph);
                                    var z3 = Math.sin(thk) * Math.sin(ph);
                                    var y3 = Math.cos(thk);
                                    if (z3 < -0.05) { ctx.moveTo(0, 0); continue; }
                                    var sx = sphereCX + x3 * sphereR;
                                    var sy = sphereCY - y3 * sphereR;
                                    if (k === 0 || z3 < 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }

                            // Draw Mercator rectangle
                            var mapL = leftW + 20, mapR = leftW + rightW, mapT = topY + 10, mapB = botY;
                            var mapW = mapR - mapL, mapH = mapB - mapT;

                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(mapL, mapT, mapW, mapH);

                            // Draw Mercator grid
                            for (var mi = 1; mi < nLat; mi++) {
                                var lat = Math.PI * mi / nLat;
                                // Mercator y = ln(tan(th/2 + pi/4)) but use simple linear for visual
                                var my = mapT + mapH * mi / nLat;
                                ctx.strokeStyle = viz.colors.teal + '55';
                                ctx.lineWidth = 0.7;
                                ctx.beginPath(); ctx.moveTo(mapL, my); ctx.lineTo(mapR, my); ctx.stroke();
                            }
                            for (var mj = 0; mj <= nLon; mj++) {
                                var mx = mapL + mapW * mj / nLon;
                                ctx.strokeStyle = viz.colors.blue + '55';
                                ctx.lineWidth = 0.7;
                                ctx.beginPath(); ctx.moveTo(mx, mapT); ctx.lineTo(mx, mapB); ctx.stroke();
                            }

                            // Show area distortion circles
                            if (showAreas) {
                                var areaLats = [0.2, 0.35, 0.5, 0.65, 0.8];
                                for (var ai = 0; ai < areaLats.length; ai++) {
                                    var frac = areaLats[ai];
                                    var theta = Math.PI * frac;
                                    var sinTh = Math.sin(theta);

                                    // On sphere
                                    var sr = 8 * sinTh; // true radius proportional to sin(theta)
                                    var scy2 = sphereCY - sphereR * Math.cos(theta);
                                    ctx.fillStyle = viz.colors.orange + '44';
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.arc(sphereCX, scy2, Math.max(3, sr), 0, Math.PI * 2);
                                    ctx.fill(); ctx.stroke();

                                    // On Mercator map: uniform size (angles preserved, areas distorted)
                                    var my2 = mapT + mapH * frac;
                                    var mapCircR = 8; // same size on map = angle preservation
                                    ctx.fillStyle = viz.colors.orange + '44';
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.arc(mapL + mapW / 2, my2, mapCircR, 0, Math.PI * 2);
                                    ctx.fill(); ctx.stroke();
                                }

                                viz.screenText('Orange circles: same angular size on sphere', viz.width / 2, viz.height - 8, viz.colors.orange, 10);
                                viz.screenText('Mercator preserves angles, distorts areas', viz.width / 2, botY + 18, viz.colors.teal, 12);
                            }
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the cylinder \\(\\mathbf{r}(u,v) = (\\cos u, \\sin u, v)\\) and the plane are isometric by exhibiting an explicit isometry and verifying it preserves the first fundamental form.',
                    hint: 'Map \\((u,v)\\) on the cylinder to \\((u,v)\\) on the plane. Show both have \\(ds^2 = du^2 + dv^2\\).',
                    solution: 'The identity map \\(\\varphi(u,v) = (u,v)\\) in parameter coordinates gives the plane with the same metric \\(ds^2 = du^2 + dv^2\\). Since both surfaces have \\(E = G = 1, F = 0\\), the first fundamental form is preserved, confirming an isometry.'
                },
                {
                    question: 'A conformal map satisfies \\(E = \\lambda^2\\), \\(F = 0\\), \\(G = \\lambda^2\\) in isothermal coordinates. Show that angles are preserved under such a map.',
                    hint: 'Two tangent vectors \\(\\mathbf{w}_1, \\mathbf{w}_2\\) have \\(\\cos\\theta = \\langle \\mathbf{w}_1, \\mathbf{w}_2\\rangle / (|\\mathbf{w}_1||\\mathbf{w}_2|)\\). Show the \\(\\lambda^2\\) cancels.',
                    solution: 'With \\(E = G = \\lambda^2, F = 0\\): \\(\\langle \\mathbf{w}_1, \\mathbf{w}_2 \\rangle = \\lambda^2(a_1a_2 + b_1b_2)\\) and \\(|\\mathbf{w}_i| = \\lambda\\sqrt{a_i^2 + b_i^2}\\). So \\(\\cos\\theta = (a_1a_2 + b_1b_2)/(\\sqrt{a_1^2+b_1^2}\\sqrt{a_2^2+b_2^2})\\). The factor \\(\\lambda^2\\) cancels completely, giving the Euclidean angle formula. Angles are preserved regardless of the value of \\(\\lambda\\).'
                }
            ]
        }
    ]
});
