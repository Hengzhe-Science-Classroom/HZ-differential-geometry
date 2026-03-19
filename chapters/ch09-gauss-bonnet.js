window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch09',
    number: 9,
    title: 'The Gauss-Bonnet Theorem',
    subtitle: 'Where geometry meets topology',
    sections: [
        // ================================================================
        // SECTION 1: Geometry Determines Topology
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Geometry Determines Topology',
            content: `
<h2>Geometry Determines Topology</h2>

<div class="env-block intuition">
    <div class="env-title">The Grand Bridge</div>
    <div class="env-body">
        <p>Throughout this course, we have studied local geometric quantities: curvature, the first and second fundamental forms, geodesics. These depend on the precise shape of a surface at each point. Topology, by contrast, is the study of properties that survive continuous deformation: stretching, bending, but not tearing or gluing. The number of "holes" in a surface is topological; the radius of curvature at a point is geometric.</p>
        <p>The Gauss-Bonnet theorem is one of the most profound results in all of mathematics: it says that integrating a purely geometric quantity (Gaussian curvature) over an entire surface yields a purely topological quantity (the Euler characteristic). Geometry determines topology.</p>
    </div>
</div>

<p>We have seen hints of this connection already. On a sphere of radius \\(R\\), the Gaussian curvature is \\(K = 1/R^2\\) everywhere. The total curvature is</p>
\\[
\\int_S K \\, dA = \\frac{1}{R^2} \\cdot 4\\pi R^2 = 4\\pi.
\\]
<p>This is independent of the radius \\(R\\). No matter how we deform the sphere (as long as we do not tear it or poke a hole in it), the total curvature remains \\(4\\pi\\). For a torus, the total curvature is \\(0\\), regardless of the particular shape of the torus. These are not coincidences.</p>

<h3>Angle Excess on Curved Surfaces</h3>

<p>On a flat plane, the interior angles of a triangle sum to \\(\\pi\\). On a sphere, geodesic triangles (triangles whose sides are great circle arcs) have angle sum <em>greater</em> than \\(\\pi\\). On a saddle surface (negative curvature), the angle sum is <em>less</em> than \\(\\pi\\). The difference from \\(\\pi\\) is called the <strong>angle excess</strong>:</p>
\\[
\\text{excess} = (\\alpha + \\beta + \\gamma) - \\pi.
\\]

<div class="env-block theorem">
    <div class="env-title">Theorem 9.0 (Angle Excess = Area on the Unit Sphere)</div>
    <div class="env-body">
        <p>For a geodesic triangle on the unit sphere with interior angles \\(\\alpha, \\beta, \\gamma\\):</p>
        \\[\\text{Area} = \\alpha + \\beta + \\gamma - \\pi.\\]
        <p>More generally, on a surface with constant Gaussian curvature \\(K\\), the area of a geodesic triangle satisfies</p>
        \\[K \\cdot \\text{Area} = (\\alpha + \\beta + \\gamma) - \\pi.\\]
    </div>
</div>

<p>This result, due to Euler and Harriot (for the sphere) and generalized by Gauss, is the seed from which the entire Gauss-Bonnet theorem grows. The angle excess of a geodesic triangle equals the integral of curvature over its interior.</p>

<div class="viz-placeholder" data-viz="viz-gauss-bonnet-triangle"></div>
`,
            visualizations: [
                {
                    id: 'viz-gauss-bonnet-triangle',
                    title: 'Geodesic Triangle on a Sphere',
                    description: 'A geodesic triangle on the unit sphere. The angle excess equals the area. Drag the slider to change the triangle size and watch the relationship hold.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 220, scale: 140
                        });

                        var triSize = 0.5;
                        VizEngine.createSlider(controls, 'Triangle size', 0.1, 1.2, triSize, 0.05, function(v) {
                            triSize = v;
                        });

                        function projectSphere(theta, phi) {
                            // Simple orthographic-ish projection with tilt
                            var x = Math.sin(theta) * Math.cos(phi);
                            var y = Math.sin(theta) * Math.sin(phi);
                            var z = Math.cos(theta);
                            // Rotate to give 3D view
                            var tilt = 0.5;
                            var yp = y * Math.cos(tilt) - z * Math.sin(tilt);
                            var zp = y * Math.sin(tilt) + z * Math.cos(tilt);
                            return [x, yp, zp];
                        }

                        function toScreen(x, y) {
                            return [viz.originX + x * viz.scale, viz.originY - y * viz.scale];
                        }

                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var time = t * 0.001;

                            // Draw sphere outline
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            for (var i = 0; i <= 100; i++) {
                                var a = 2 * Math.PI * i / 100;
                                var s = toScreen(Math.cos(a), Math.sin(a));
                                i === 0 ? ctx.moveTo(s[0], s[1]) : ctx.lineTo(s[0], s[1]);
                            }
                            ctx.stroke();

                            // Latitude/longitude lines for depth
                            ctx.strokeStyle = viz.colors.grid + '44';
                            ctx.lineWidth = 0.5;
                            for (var lat = -60; lat <= 60; lat += 30) {
                                ctx.beginPath();
                                var started = false;
                                for (var lon = 0; lon <= 360; lon += 3) {
                                    var pr = projectSphere((90 - lat) * Math.PI / 180, lon * Math.PI / 180);
                                    if (pr[2] > 0) {
                                        var ss = toScreen(pr[0], pr[1]);
                                        if (!started) { ctx.moveTo(ss[0], ss[1]); started = true; }
                                        else ctx.lineTo(ss[0], ss[1]);
                                    } else { started = false; }
                                }
                                ctx.stroke();
                            }
                            for (var lon2 = 0; lon2 < 180; lon2 += 30) {
                                ctx.beginPath();
                                var started2 = false;
                                for (var lat2 = 0; lat2 <= 180; lat2 += 3) {
                                    var pr2 = projectSphere(lat2 * Math.PI / 180, lon2 * Math.PI / 180);
                                    if (pr2[2] > 0) {
                                        var ss2 = toScreen(pr2[0], pr2[1]);
                                        if (!started2) { ctx.moveTo(ss2[0], ss2[1]); started2 = true; }
                                        else ctx.lineTo(ss2[0], ss2[1]);
                                    } else { started2 = false; }
                                }
                                ctx.stroke();
                            }

                            // Geodesic triangle vertices on the sphere
                            var s = triSize;
                            var v1 = [0.3, 0.8 + 0.3 * s]; // (theta, phi)
                            var v2 = [0.3 + 0.6 * s, 0.8 - 0.4 * s];
                            var v3 = [0.3 + 0.3 * s, 0.8 + 0.8 * s];

                            // Draw great circle arcs between vertices
                            function drawGreatArc(th1, ph1, th2, ph2, color) {
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var started3 = false;
                                for (var tt = 0; tt <= 40; tt++) {
                                    var frac = tt / 40;
                                    // Spherical linear interpolation
                                    var x1 = Math.sin(th1) * Math.cos(ph1);
                                    var y1 = Math.sin(th1) * Math.sin(ph1);
                                    var z1 = Math.cos(th1);
                                    var x2 = Math.sin(th2) * Math.cos(ph2);
                                    var y2 = Math.sin(th2) * Math.sin(ph2);
                                    var z2 = Math.cos(th2);
                                    var dot = x1*x2 + y1*y2 + z1*z2;
                                    dot = Math.max(-1, Math.min(1, dot));
                                    var omega = Math.acos(dot);
                                    var so = Math.sin(omega);
                                    var px, py, pz;
                                    if (Math.abs(so) < 1e-8) {
                                        px = x1; py = y1; pz = z1;
                                    } else {
                                        var sa = Math.sin((1 - frac) * omega) / so;
                                        var sb = Math.sin(frac * omega) / so;
                                        px = sa * x1 + sb * x2;
                                        py = sa * y1 + sb * y2;
                                        pz = sa * z1 + sb * z2;
                                    }
                                    // Project
                                    var tilt = 0.5;
                                    var pyp = py * Math.cos(tilt) - pz * Math.sin(tilt);
                                    var pzp = py * Math.sin(tilt) + pz * Math.cos(tilt);
                                    if (pzp > -0.05) {
                                        var scr = toScreen(px, pyp);
                                        if (!started3) { ctx.moveTo(scr[0], scr[1]); started3 = true; }
                                        else ctx.lineTo(scr[0], scr[1]);
                                    }
                                }
                                ctx.stroke();
                            }

                            drawGreatArc(v1[0], v1[1], v2[0], v2[1], viz.colors.blue);
                            drawGreatArc(v2[0], v2[1], v3[0], v3[1], viz.colors.teal);
                            drawGreatArc(v3[0], v3[1], v1[0], v1[1], viz.colors.orange);

                            // Shade the triangle
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.beginPath();
                            var triPts = [];
                            var allArcs = [[v1, v2], [v2, v3], [v3, v1]];
                            for (var ai = 0; ai < 3; ai++) {
                                var va = allArcs[ai][0], vb = allArcs[ai][1];
                                for (var tt2 = 0; tt2 <= 20; tt2++) {
                                    var frac2 = tt2 / 20;
                                    var xa = Math.sin(va[0]) * Math.cos(va[1]);
                                    var ya = Math.sin(va[0]) * Math.sin(va[1]);
                                    var za = Math.cos(va[0]);
                                    var xb = Math.sin(vb[0]) * Math.cos(vb[1]);
                                    var yb = Math.sin(vb[0]) * Math.sin(vb[1]);
                                    var zb = Math.cos(vb[0]);
                                    var dab = xa*xb + ya*yb + za*zb;
                                    dab = Math.max(-1, Math.min(1, dab));
                                    var om2 = Math.acos(dab);
                                    var so2 = Math.sin(om2);
                                    var ppx, ppy, ppz;
                                    if (Math.abs(so2) < 1e-8) { ppx = xa; ppy = ya; ppz = za; }
                                    else {
                                        var saa = Math.sin((1 - frac2) * om2) / so2;
                                        var sbb = Math.sin(frac2 * om2) / so2;
                                        ppx = saa*xa + sbb*xb;
                                        ppy = saa*ya + sbb*yb;
                                        ppz = saa*za + sbb*zb;
                                    }
                                    var tilt2 = 0.5;
                                    var pyp2 = ppy * Math.cos(tilt2) - ppz * Math.sin(tilt2);
                                    triPts.push(toScreen(ppx, pyp2));
                                }
                            }
                            if (triPts.length > 0) {
                                ctx.moveTo(triPts[0][0], triPts[0][1]);
                                for (var tp = 1; tp < triPts.length; tp++) {
                                    ctx.lineTo(triPts[tp][0], triPts[tp][1]);
                                }
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Compute spherical area = angle excess
                            // Use the spherical excess formula: for unit sphere
                            // compute side lengths (arc lengths) from dot products
                            function sphPt(v) {
                                return [Math.sin(v[0])*Math.cos(v[1]), Math.sin(v[0])*Math.sin(v[1]), Math.cos(v[0])];
                            }
                            var p1 = sphPt(v1), p2 = sphPt(v2), p3 = sphPt(v3);
                            function dotV(a, b) { return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]; }
                            function crossV(a, b) { return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]; }
                            function normV(a) { return Math.sqrt(dotV(a, a)); }

                            // Angles at each vertex via dihedral angle of planes
                            function sphAngle(center, left, right) {
                                // Vectors from center to left and right, projected onto tangent plane
                                var cl = [left[0]-dotV(left,center)*center[0], left[1]-dotV(left,center)*center[1], left[2]-dotV(left,center)*center[2]];
                                var cr = [right[0]-dotV(right,center)*center[0], right[1]-dotV(right,center)*center[1], right[2]-dotV(right,center)*center[2]];
                                var nl = normV(cl), nr = normV(cr);
                                if (nl < 1e-10 || nr < 1e-10) return 0;
                                cl = [cl[0]/nl, cl[1]/nl, cl[2]/nl];
                                cr = [cr[0]/nr, cr[1]/nr, cr[2]/nr];
                                var d = dotV(cl, cr);
                                d = Math.max(-1, Math.min(1, d));
                                return Math.acos(d);
                            }

                            var alpha = sphAngle(p1, p2, p3);
                            var beta = sphAngle(p2, p3, p1);
                            var gamma = sphAngle(p3, p1, p2);
                            var excess = alpha + beta + gamma - Math.PI;
                            var area = excess; // on unit sphere

                            // Info panel
                            var infoY = 20;
                            viz.screenText('Geodesic Triangle on the Unit Sphere', viz.width / 2, infoY, viz.colors.white, 15);
                            viz.screenText(
                                '\u03B1 = ' + (alpha * 180 / Math.PI).toFixed(1) + '\u00B0   ' +
                                '\u03B2 = ' + (beta * 180 / Math.PI).toFixed(1) + '\u00B0   ' +
                                '\u03B3 = ' + (gamma * 180 / Math.PI).toFixed(1) + '\u00B0',
                                viz.width / 2, viz.height - 50, viz.colors.text, 12
                            );
                            viz.screenText(
                                'Sum = ' + ((alpha + beta + gamma) * 180 / Math.PI).toFixed(1) + '\u00B0 > 180\u00B0     ' +
                                'Excess = Area = ' + excess.toFixed(3) + ' sr',
                                viz.width / 2, viz.height - 30, viz.colors.teal, 13
                            );
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'On the unit sphere, a geodesic triangle has angles \\(\\pi/2, \\pi/2, \\pi/2\\). What is its area?',
                    hint: 'Use the spherical excess formula: Area = angle sum minus \\(\\pi\\).',
                    solution: 'Area = \\(\\pi/2 + \\pi/2 + \\pi/2 - \\pi = \\pi/2\\). This is one-eighth of the total sphere area \\(4\\pi\\), corresponding to a spherical triangle bounded by three mutually perpendicular great circles (an octant).'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Local Gauss-Bonnet
        // ================================================================
        {
            id: 'sec-local',
            title: 'Local Gauss-Bonnet',
            content: `
<h2>The Local Gauss-Bonnet Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">Curvature Accounting</div>
    <div class="env-body">
        <p>Imagine walking along the boundary of a region on a surface. At each point, you turn; the rate of turning is measured by the geodesic curvature \\(\\kappa_g\\). At corners, you make discrete jumps measured by exterior angles. Inside the region, the surface itself curves, measured by Gaussian curvature \\(K\\). The local Gauss-Bonnet theorem says these three sources of "turning" always add up to exactly \\(2\\pi\\) for a simply connected region.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Geodesic Curvature)</div>
    <div class="env-body">
        <p>Let \\(\\gamma\\) be a curve on a surface \\(S\\) parametrized by arc length. The <strong>geodesic curvature</strong> \\(\\kappa_g\\) at a point is the component of the curvature vector that lies tangent to the surface:</p>
        \\[\\kappa_g = \\gamma'' \\cdot (\\mathbf{N} \\times \\gamma')\\]
        <p>where \\(\\mathbf{N}\\) is the surface normal. A geodesic has \\(\\kappa_g = 0\\) everywhere.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Exterior Angle)</div>
    <div class="env-body">
        <p>At a vertex of a polygon on a surface, the <strong>exterior angle</strong> \\(\\theta_i\\) is the angle one must turn through to go from one edge direction to the next. For a smooth convex curve, the total turning is \\(2\\pi\\). At a corner, the exterior angle is \\(\\pi\\) minus the interior angle.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.1 (Local Gauss-Bonnet)</div>
    <div class="env-body">
        <p>Let \\(R\\) be a simply connected region on an oriented surface \\(S\\), bounded by a piecewise smooth, positively oriented curve \\(\\partial R\\). Let \\(\\theta_1, \\ldots, \\theta_n\\) be the exterior angles at the vertices. Then</p>
        \\[\\int_{\\partial R} \\kappa_g \\, ds + \\int_R K \\, dA + \\sum_{i=1}^{n} \\theta_i = 2\\pi.\\]
    </div>
</div>

<p>This is a remarkable "budget equation." The three terms represent:</p>
<ul>
    <li><strong>Boundary geodesic curvature:</strong> how much the boundary curves <em>within</em> the surface</li>
    <li><strong>Interior Gaussian curvature:</strong> how much the surface itself curves</li>
    <li><strong>Corner turning:</strong> the discrete jumps at vertices</li>
</ul>

<h3>Special Cases</h3>

<div class="env-block example">
    <div class="env-title">Example: Geodesic Triangle</div>
    <div class="env-body">
        <p>If the boundary is a geodesic triangle (all sides are geodesics), then \\(\\kappa_g = 0\\) along each side. The exterior angles are \\(\\theta_i = \\pi - \\alpha_i\\) where \\(\\alpha_i\\) are the interior angles. So:</p>
        \\[\\int_R K \\, dA + (3\\pi - \\alpha_1 - \\alpha_2 - \\alpha_3) = 2\\pi\\]
        \\[\\int_R K \\, dA = (\\alpha_1 + \\alpha_2 + \\alpha_3) - \\pi.\\]
        <p>This recovers the angle excess formula.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Geodesic Disk on a Flat Surface</div>
    <div class="env-body">
        <p>On a flat surface (\\(K = 0\\)), a small circle of radius \\(r\\) has \\(\\kappa_g = 1/r\\) and circumference \\(2\\pi r\\). No corners, so:</p>
        \\[\\int_{\\partial R} \\kappa_g \\, ds = \\frac{1}{r} \\cdot 2\\pi r = 2\\pi. \\quad \\checkmark\\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-angle-deficit"></div>
`,
            visualizations: [
                {
                    id: 'viz-angle-deficit',
                    title: 'Angle Deficit on Curved Surfaces',
                    description: 'A polygon on a curved surface. On positive curvature, angles sum to more than expected; on negative curvature, less. Adjust curvature to see the deficit change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 80
                        });

                        var curvature = 0.3;
                        var nSides = 3;
                        VizEngine.createSlider(controls, 'Curvature K', -1.0, 1.0, curvature, 0.05, function(v) {
                            curvature = v;
                        });
                        VizEngine.createSlider(controls, 'Sides', 3, 6, nSides, 1, function(v) {
                            nSides = Math.round(v);
                        });

                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Polygon on a Surface with K = ' + curvature.toFixed(2), viz.width / 2, 20, viz.colors.white, 14);

                            // Draw a "surface" background with curvature coloring
                            var bgColor = curvature > 0 ? viz.colors.blue : (curvature < 0 ? viz.colors.red : viz.colors.grid);
                            ctx.fillStyle = bgColor + '15';
                            ctx.beginPath();
                            ctx.ellipse(viz.originX, viz.originY, 180, 140, 0, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = bgColor + '33';
                            ctx.lineWidth = 1;
                            ctx.stroke();

                            // Draw regular polygon
                            var R = 2.0;
                            var pts = [];
                            for (var i = 0; i < nSides; i++) {
                                var angle = 2 * Math.PI * i / nSides - Math.PI / 2;
                                pts.push([R * Math.cos(angle), R * Math.sin(angle)]);
                            }

                            // On a surface with curvature K, a regular polygon with n sides
                            // inscribed in a geodesic circle of radius R has interior angles
                            // that differ from flat case by the curvature contribution
                            var flatInterior = (nSides - 2) * Math.PI / nSides;
                            // Area of the polygon ~ n * R^2 * sin(2pi/n) / 2
                            var polyArea = nSides * R * R * Math.sin(2 * Math.PI / nSides) / 2;
                            // By local Gauss-Bonnet: sum of interior angles = (n-2)*pi + K*Area
                            var totalAngle = (nSides - 2) * Math.PI + curvature * polyArea;
                            var actualInterior = totalAngle / nSides;

                            // Draw polygon edges
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var j = 0; j <= nSides; j++) {
                                var p = pts[j % nSides];
                                var sp = viz.toScreen(p[0], p[1]);
                                j === 0 ? ctx.moveTo(sp[0], sp[1]) : ctx.lineTo(sp[0], sp[1]);
                            }
                            ctx.closePath();
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.teal + '18';
                            ctx.fill();

                            // Draw angle arcs at vertices
                            for (var k = 0; k < nSides; k++) {
                                var curr = pts[k];
                                var prev = pts[(k + nSides - 1) % nSides];
                                var next = pts[(k + 1) % nSides];
                                var sp2 = viz.toScreen(curr[0], curr[1]);

                                // Edge directions
                                var dx1 = prev[0] - curr[0], dy1 = prev[1] - curr[1];
                                var dx2 = next[0] - curr[0], dy2 = next[1] - curr[1];
                                var a1 = Math.atan2(dy1, dx1);
                                var a2 = Math.atan2(dy2, dx2);

                                // Normalize so we draw the interior angle
                                var start = a2, end = a1;
                                if (end < start) end += 2 * Math.PI;
                                if (end - start > Math.PI + 0.01) { start = a1; end = a2; if (end < start) end += 2 * Math.PI; }

                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                // Draw arc in screen space (angles are inverted in y)
                                ctx.arc(sp2[0], sp2[1], 18, -end, -start);
                                ctx.stroke();

                                // Vertex dot
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.arc(sp2[0], sp2[1], 4, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Display results
                            var flatSum = (nSides - 2) * 180;
                            var actualSum = totalAngle * 180 / Math.PI;
                            var deficit = actualSum - flatSum;

                            var infoY = viz.height - 75;
                            viz.screenText('Flat case: angle sum = ' + flatSum.toFixed(0) + '\u00B0', viz.width / 2, infoY, viz.colors.text, 12);
                            viz.screenText(
                                'Curved: angle sum = ' + actualSum.toFixed(1) + '\u00B0   (excess = ' + deficit.toFixed(1) + '\u00B0)',
                                viz.width / 2, infoY + 20, viz.colors.orange, 13
                            );
                            viz.screenText(
                                'K \u00B7 Area = ' + (curvature * polyArea).toFixed(3) + ' = angle excess in radians',
                                viz.width / 2, infoY + 40, viz.colors.teal, 12
                            );

                            // Curvature label
                            var label = curvature > 0.01 ? 'Positive curvature (sphere-like)' :
                                        (curvature < -0.01 ? 'Negative curvature (saddle-like)' : 'Zero curvature (flat)');
                            viz.screenText(label, viz.width / 2, infoY + 60, viz.colors.white, 11);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Apply the local Gauss-Bonnet theorem to a geodesic digon (a region bounded by two geodesic arcs meeting at two vertices with exterior angles \\(\\theta_1\\) and \\(\\theta_2\\)). Show that \\(\\int_R K \\, dA = 2\\pi - \\theta_1 - \\theta_2\\).',
                    hint: 'Geodesic sides have \\(\\kappa_g = 0\\). Apply the local Gauss-Bonnet formula directly.',
                    solution: 'Since both sides are geodesics, \\(\\int_{\\partial R} \\kappa_g \\, ds = 0\\). By local Gauss-Bonnet: \\(0 + \\int_R K \\, dA + \\theta_1 + \\theta_2 = 2\\pi\\), so \\(\\int_R K \\, dA = 2\\pi - \\theta_1 - \\theta_2\\). For a lune on the unit sphere with dihedral angle \\(\\alpha\\), the exterior angles are both \\(\\pi - \\alpha\\), giving area \\(= 2\\pi - 2(\\pi - \\alpha) = 2\\alpha\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Global Gauss-Bonnet
        // ================================================================
        {
            id: 'sec-global',
            title: 'Global Gauss-Bonnet',
            content: `
<h2>The Global Gauss-Bonnet Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">From Local to Global</div>
    <div class="env-body">
        <p>The local Gauss-Bonnet theorem applies to a simply connected region with boundary. What happens when we apply it to an entire closed surface (compact, without boundary)? We triangulate the surface and apply the local theorem to each triangle. Remarkably, all the boundary terms cancel in pairs, and what remains is a direct link between total curvature and topology.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.2 (Global Gauss-Bonnet)</div>
    <div class="env-body">
        <p>Let \\(S\\) be a compact, oriented surface without boundary. Then</p>
        \\[\\int_S K \\, dA = 2\\pi \\chi(S)\\]
        <p>where \\(\\chi(S)\\) is the <strong>Euler characteristic</strong> of \\(S\\).</p>
    </div>
</div>

<p>This is one of the deepest results in differential geometry. The left side is purely geometric (it depends on the curvature, which depends on the shape). The right side is purely topological (it depends only on the "type" of surface: sphere, torus, etc.).</p>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Triangulate \\(S\\) into geodesic triangles with \\(V\\) vertices, \\(E\\) edges, \\(F\\) faces. Apply the local Gauss-Bonnet theorem to each face:</p>
        \\[\\sum_{\\text{faces}} \\int_{\\Delta_i} K \\, dA = \\sum_{\\text{faces}} \\left(\\sum \\text{interior angles} - \\pi\\right).\\]
        <p>The sum of all interior angles at each vertex is \\(2\\pi\\), so the total is \\(2\\pi V\\). Each face contributes \\(-\\pi\\), so the total subtraction is \\(-\\pi F\\). Since each edge is shared by exactly two faces, the count gives:</p>
        \\[\\int_S K \\, dA = 2\\pi V - \\pi F.\\]
        <p>Using \\(3F = 2E\\) (each face has 3 edges, each edge borders 2 faces), we get \\(F = 2E/3\\), and</p>
        \\[\\int_S K \\, dA = 2\\pi V - 2\\pi E/3 \\cdot ... \\]
        <p>Working through the combinatorics carefully yields \\(\\int_S K \\, dA = 2\\pi(V - E + F) = 2\\pi \\chi(S)\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Fundamental Examples</h3>

<div class="env-block example">
    <div class="env-title">Example: Closed Surfaces</div>
    <div class="env-body">
        <p><strong>Sphere</strong> (genus 0): \\(\\chi = 2\\), so \\(\\int_S K \\, dA = 4\\pi\\). For the unit sphere, \\(K = 1\\) and area = \\(4\\pi\\). Check: \\(1 \\times 4\\pi = 4\\pi\\). \\(\\checkmark\\)</p>
        <p><strong>Torus</strong> (genus 1): \\(\\chi = 0\\), so \\(\\int_S K \\, dA = 0\\). The torus has regions of positive curvature (outside) and negative curvature (inside), and they exactly cancel.</p>
        <p><strong>Genus-2 surface</strong> (double torus): \\(\\chi = -2\\), so \\(\\int_S K \\, dA = -4\\pi\\). On average, the surface has negative curvature.</p>
        <p>In general, for a surface of genus \\(g\\): \\(\\chi = 2 - 2g\\) and \\(\\int_S K \\, dA = 2\\pi(2 - 2g)\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-global-gauss-bonnet"></div>
`,
            visualizations: [
                {
                    id: 'viz-global-gauss-bonnet',
                    title: 'Total Curvature vs. Topology',
                    description: 'See how total curvature depends only on the genus of the surface: sphere = 4\u03C0, torus = 0, genus-2 = -4\u03C0.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var genus = 0;
                        VizEngine.createSlider(controls, 'Genus g', 0, 5, genus, 1, function(v) {
                            genus = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Global Gauss-Bonnet: \u222B K dA = 2\u03C0\u03C7(S)', viz.width / 2, 25, viz.colors.white, 15);

                            var chi = 2 - 2 * genus;
                            var totalK = 2 * Math.PI * chi;

                            // Draw surface schematic
                            var cx = viz.width / 2;
                            var cy = 160;

                            if (genus === 0) {
                                // Sphere
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(cx, cy, 60, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.blue + '22';
                                ctx.fill();
                                // Latitude lines
                                ctx.strokeStyle = viz.colors.blue + '44';
                                ctx.lineWidth = 0.8;
                                for (var i = -2; i <= 2; i++) {
                                    var ey = cy + i * 18;
                                    var ex = Math.sqrt(Math.max(0, 60*60 - (i*18)*(i*18)));
                                    ctx.beginPath();
                                    ctx.ellipse(cx, ey, ex, ex * 0.25, 0, 0, Math.PI * 2);
                                    ctx.stroke();
                                }
                                viz.screenText('Sphere', cx, cy + 80, viz.colors.blue, 12);
                            } else {
                                // Draw genus-g surface as connected tori
                                var totalWidth = genus * 70 + (genus - 1) * 20;
                                var startX = cx - totalWidth / 2;

                                for (var g = 0; g < genus; g++) {
                                    var hx = startX + g * 90 + 35;
                                    var hy = cy;
                                    // Outer ellipse
                                    ctx.strokeStyle = (genus === 1 ? viz.colors.teal : viz.colors.purple);
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.ellipse(hx, hy, 35, 50, 0, 0, Math.PI * 2);
                                    ctx.stroke();
                                    ctx.fillStyle = (genus === 1 ? viz.colors.teal : viz.colors.purple) + '15';
                                    ctx.fill();
                                    // Hole
                                    ctx.strokeStyle = (genus === 1 ? viz.colors.teal : viz.colors.purple) + '88';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.ellipse(hx, hy, 18, 12, 0, 0, Math.PI * 2);
                                    ctx.stroke();
                                    // Connection bridge to next
                                    if (g < genus - 1) {
                                        ctx.strokeStyle = (genus === 1 ? viz.colors.teal : viz.colors.purple) + '66';
                                        ctx.lineWidth = 1.5;
                                        ctx.beginPath();
                                        ctx.moveTo(hx + 35, hy - 15);
                                        ctx.lineTo(hx + 55, hy - 15);
                                        ctx.stroke();
                                        ctx.beginPath();
                                        ctx.moveTo(hx + 35, hy + 15);
                                        ctx.lineTo(hx + 55, hy + 15);
                                        ctx.stroke();
                                    }
                                }
                                var name = genus === 1 ? 'Torus' : ('Genus-' + genus + ' surface');
                                viz.screenText(name, cx, cy + 70, genus === 1 ? viz.colors.teal : viz.colors.purple, 12);
                            }

                            // Results table
                            var tableY = 260;
                            var col1 = 130, col2 = 260, col3 = 400;

                            ctx.fillStyle = viz.colors.grid;
                            ctx.fillRect(70, tableY - 15, viz.width - 140, 1);

                            viz.screenText('Property', col1, tableY, viz.colors.text, 12);
                            viz.screenText('Formula', col2, tableY, viz.colors.text, 12);
                            viz.screenText('Value', col3, tableY, viz.colors.text, 12);

                            ctx.fillStyle = viz.colors.grid;
                            ctx.fillRect(70, tableY + 10, viz.width - 140, 1);

                            viz.screenText('Genus g', col1, tableY + 30, viz.colors.white, 12);
                            viz.screenText('', col2, tableY + 30, viz.colors.white, 12);
                            viz.screenText(genus.toString(), col3, tableY + 30, viz.colors.orange, 14);

                            viz.screenText('Euler char. \u03C7', col1, tableY + 55, viz.colors.white, 12);
                            viz.screenText('2 - 2g', col2, tableY + 55, viz.colors.text, 12);
                            viz.screenText(chi.toString(), col3, tableY + 55, viz.colors.teal, 14);

                            viz.screenText('\u222B K dA', col1, tableY + 80, viz.colors.white, 12);
                            viz.screenText('2\u03C0\u03C7', col2, tableY + 80, viz.colors.text, 12);

                            var totalStr;
                            if (chi === 0) totalStr = '0';
                            else if (chi === 2) totalStr = '4\u03C0 \u2248 ' + totalK.toFixed(2);
                            else if (chi === -2) totalStr = '-4\u03C0 \u2248 ' + totalK.toFixed(2);
                            else totalStr = (2 * chi) + '\u03C0 \u2248 ' + totalK.toFixed(2);
                            var totalColor = totalK > 0 ? viz.colors.blue : (totalK < 0 ? viz.colors.red : viz.colors.teal);
                            viz.screenText(totalStr, col3, tableY + 80, totalColor, 14);

                            ctx.fillStyle = viz.colors.grid;
                            ctx.fillRect(70, tableY + 100, viz.width - 140, 1);

                            // Interpretation
                            var interp;
                            if (chi > 0) interp = 'Net positive curvature: more "sphere-like"';
                            else if (chi === 0) interp = 'Curvature cancels: positive and negative regions balance';
                            else interp = 'Net negative curvature: more "saddle-like" on average';
                            viz.screenText(interp, viz.width / 2, tableY + 120, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The Gaussian curvature of a torus of revolution (major radius \\(R\\), minor radius \\(r\\)) is \\(K = \\cos\\theta / (r(R + r\\cos\\theta))\\) where \\(\\theta\\) is the angle around the tube. Verify directly that \\(\\int_T K \\, dA = 0\\).',
                    hint: 'The area element is \\(dA = r(R + r\\cos\\theta) \\, d\\theta \\, d\\phi\\). The integral over \\(\\phi\\) from 0 to \\(2\\pi\\) is trivial. Then integrate \\(\\cos\\theta\\) over a full period.',
                    solution: '\\(\\int_T K \\, dA = \\int_0^{2\\pi} \\int_0^{2\\pi} \\frac{\\cos\\theta}{r(R+r\\cos\\theta)} \\cdot r(R+r\\cos\\theta) \\, d\\theta \\, d\\phi = \\int_0^{2\\pi} d\\phi \\int_0^{2\\pi} \\cos\\theta \\, d\\theta = 2\\pi \\cdot 0 = 0\\). This confirms Gauss-Bonnet since \\(\\chi(\\text{torus}) = 0\\).'
                },
                {
                    question: 'A compact surface has \\(\\int_S K \\, dA = -8\\pi\\). What is its genus?',
                    hint: 'Use \\(\\int_S K \\, dA = 2\\pi(2-2g)\\) and solve for \\(g\\).',
                    solution: '\\(-8\\pi = 2\\pi(2-2g)\\) gives \\(2-2g = -4\\), so \\(g = 3\\). The surface is homeomorphic to a genus-3 surface (a "pretzel" with three holes).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Euler Characteristic
        // ================================================================
        {
            id: 'sec-euler',
            title: 'Euler Characteristic',
            content: `
<h2>The Euler Characteristic</h2>

<div class="env-block intuition">
    <div class="env-title">Counting Faces, Edges, and Vertices</div>
    <div class="env-body">
        <p>Leonhard Euler noticed a remarkable pattern around 1750: for any convex polyhedron, \\(V - E + F = 2\\), where \\(V\\) is the number of vertices, \\(E\\) edges, and \\(F\\) faces. A cube has \\(8 - 12 + 6 = 2\\). A tetrahedron has \\(4 - 6 + 4 = 2\\). An icosahedron has \\(12 - 30 + 20 = 2\\). Always 2. This number is a topological invariant: it depends on the "type" of surface, not the particular triangulation.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Euler Characteristic)</div>
    <div class="env-body">
        <p>Given a triangulation (or more generally, a cell decomposition) of a compact surface \\(S\\) into \\(V\\) vertices, \\(E\\) edges, and \\(F\\) faces, the <strong>Euler characteristic</strong> is</p>
        \\[\\chi(S) = V - E + F.\\]
        <p>This number is independent of the choice of triangulation and is a topological invariant of \\(S\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.3 (Classification of Surfaces)</div>
    <div class="env-body">
        <p>Every compact, connected, orientable surface without boundary is homeomorphic to a sphere with \\(g\\) handles attached, for some \\(g \\geq 0\\). The number \\(g\\) is called the <strong>genus</strong>. The Euler characteristic is</p>
        \\[\\chi = 2 - 2g.\\]
    </div>
</div>

<table class="env-table" style="margin: 1em auto; border-collapse: collapse; width: 80%;">
<tr style="border-bottom: 1px solid #30363d;">
    <th style="padding: 6px 12px; text-align: center;">Surface</th>
    <th style="padding: 6px 12px; text-align: center;">Genus \\(g\\)</th>
    <th style="padding: 6px 12px; text-align: center;">\\(\\chi\\)</th>
    <th style="padding: 6px 12px; text-align: center;">\\(\\int K \\, dA\\)</th>
</tr>
<tr><td style="padding: 6px 12px; text-align: center;">Sphere</td><td style="padding: 6px 12px; text-align: center;">0</td><td style="padding: 6px 12px; text-align: center;">2</td><td style="padding: 6px 12px; text-align: center;">\\(4\\pi\\)</td></tr>
<tr><td style="padding: 6px 12px; text-align: center;">Torus</td><td style="padding: 6px 12px; text-align: center;">1</td><td style="padding: 6px 12px; text-align: center;">0</td><td style="padding: 6px 12px; text-align: center;">\\(0\\)</td></tr>
<tr><td style="padding: 6px 12px; text-align: center;">Double torus</td><td style="padding: 6px 12px; text-align: center;">2</td><td style="padding: 6px 12px; text-align: center;">\\(-2\\)</td><td style="padding: 6px 12px; text-align: center;">\\(-4\\pi\\)</td></tr>
<tr><td style="padding: 6px 12px; text-align: center;">Genus-\\(g\\)</td><td style="padding: 6px 12px; text-align: center;">\\(g\\)</td><td style="padding: 6px 12px; text-align: center;">\\(2-2g\\)</td><td style="padding: 6px 12px; text-align: center;">\\(2\\pi(2-2g)\\)</td></tr>
</table>

<h3>Invariance Under Refinement</h3>

<p>A key property: if we subdivide a triangulation (e.g., add a vertex in the middle of an edge, splitting two faces), \\(\\chi\\) does not change. Adding a vertex in the interior of a face creates 2 new edges and 1 new face: \\(\\Delta V = 1, \\Delta E = 2 \\cdot 1 = 3 - 1 = 2, \\Delta F = 2 - 1 = 1\\)... wait, let us be precise. Splitting one face by adding an interior vertex and connecting it to all 3 vertices: \\(\\Delta V = +1, \\Delta E = +3, \\Delta F = +2\\). So \\(\\Delta \\chi = 1 - 3 + 2 = 0\\). The Euler characteristic is unchanged.</p>

<div class="viz-placeholder" data-viz="viz-euler-characteristic"></div>
`,
            visualizations: [
                {
                    id: 'viz-euler-characteristic',
                    title: 'Euler Characteristic of Polyhedra',
                    description: 'V - E + F = 2 for all convex polyhedra (topological spheres). Select different polyhedra and verify the formula.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var polyhedra = [
                            { name: 'Tetrahedron', V: 4, E: 6, F: 4, verts: [[0,-1,-0.7],[1,0.5,-0.7],[-1,0.5,-0.7],[0,0,1]], faces: [[0,1,2],[0,1,3],[1,2,3],[0,2,3]] },
                            { name: 'Cube', V: 8, E: 12, F: 6, verts: [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]], faces: [[0,1,2,3],[4,5,6,7],[0,1,5,4],[2,3,7,6],[0,3,7,4],[1,2,6,5]] },
                            { name: 'Octahedron', V: 6, E: 12, F: 8, verts: [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]], faces: [[0,2,4],[2,1,4],[1,3,4],[3,0,4],[0,2,5],[2,1,5],[1,3,5],[3,0,5]] },
                            { name: 'Icosahedron', V: 12, E: 30, F: 20, verts: null, faces: null },
                            { name: 'Dodecahedron', V: 20, E: 30, F: 12, verts: null, faces: null }
                        ];

                        var selected = 0;
                        for (var i = 0; i < polyhedra.length; i++) {
                            (function(idx) {
                                VizEngine.createButton(controls, polyhedra[idx].name, function() {
                                    selected = idx;
                                    draw();
                                });
                            })(i);
                        }

                        function project3D(x, y, z, rotY, rotX) {
                            // Rotate around Y
                            var x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
                            var z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
                            // Rotate around X
                            var y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
                            var z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
                            // Perspective-ish
                            var sc = 80 / (3 + z2 * 0.3);
                            return [viz.width / 2 + x1 * sc, 180 - y1 * sc];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var p = polyhedra[selected];

                            viz.screenText('Euler Characteristic: V - E + F', viz.width / 2, 20, viz.colors.white, 15);
                            viz.screenText(p.name, viz.width / 2, 45, viz.colors.teal, 13);

                            // Draw a wireframe if we have vertex data
                            var rotY = 0.5, rotX = 0.35;
                            if (p.verts) {
                                // Draw edges
                                var drawnEdges = {};
                                for (var fi = 0; fi < p.faces.length; fi++) {
                                    var face = p.faces[fi];
                                    for (var ei = 0; ei < face.length; ei++) {
                                        var a = face[ei], b = face[(ei + 1) % face.length];
                                        var key = Math.min(a, b) + '-' + Math.max(a, b);
                                        if (!drawnEdges[key]) {
                                            drawnEdges[key] = true;
                                            var pa = project3D(p.verts[a][0], p.verts[a][1], p.verts[a][2], rotY, rotX);
                                            var pb = project3D(p.verts[b][0], p.verts[b][1], p.verts[b][2], rotY, rotX);
                                            ctx.strokeStyle = viz.colors.blue + '88';
                                            ctx.lineWidth = 1.5;
                                            ctx.beginPath();
                                            ctx.moveTo(pa[0], pa[1]);
                                            ctx.lineTo(pb[0], pb[1]);
                                            ctx.stroke();
                                        }
                                    }
                                }
                                // Draw vertices
                                for (var vi = 0; vi < p.verts.length; vi++) {
                                    var pv = project3D(p.verts[vi][0], p.verts[vi][1], p.verts[vi][2], rotY, rotX);
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.beginPath();
                                    ctx.arc(pv[0], pv[1], 4, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            } else {
                                // For icosahedron/dodecahedron, just show schematic
                                ctx.strokeStyle = viz.colors.blue + '44';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(viz.width / 2, 180, 70, 0, Math.PI * 2);
                                ctx.stroke();
                                viz.screenText('(3D wireframe for simple polyhedra)', viz.width / 2, 180, viz.colors.text, 11);
                            }

                            // The V - E + F table
                            var tY = 300;
                            var cols = [140, 240, 340, 440];

                            ctx.fillStyle = viz.colors.grid;
                            ctx.fillRect(80, tY - 15, 400, 1);

                            viz.screenText('V', cols[0], tY, viz.colors.blue, 14);
                            viz.screenText('E', cols[1], tY, viz.colors.orange, 14);
                            viz.screenText('F', cols[2], tY, viz.colors.teal, 14);
                            viz.screenText('V-E+F', cols[3], tY, viz.colors.white, 14);

                            ctx.fillStyle = viz.colors.grid;
                            ctx.fillRect(80, tY + 12, 400, 1);

                            viz.screenText(p.V.toString(), cols[0], tY + 35, viz.colors.blue, 18);
                            viz.screenText(p.E.toString(), cols[1], tY + 35, viz.colors.orange, 18);
                            viz.screenText(p.F.toString(), cols[2], tY + 35, viz.colors.teal, 18);

                            var chi = p.V - p.E + p.F;
                            viz.screenText(chi.toString(), cols[3], tY + 35, viz.colors.green, 22);

                            viz.screenText(
                                p.V + ' - ' + p.E + ' + ' + p.F + ' = ' + chi,
                                viz.width / 2, tY + 65, viz.colors.white, 13
                            );

                            viz.screenText(
                                'All convex polyhedra (topological spheres) have \u03C7 = 2',
                                viz.width / 2, tY + 88, viz.colors.text, 11
                            );
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A triangulation of the torus has 9 vertices. How many edges and faces must it have?',
                    hint: 'Use \\(\\chi = 0\\) and the relation \\(3F = 2E\\) (every face has 3 edges, each shared by 2 faces).',
                    solution: 'From \\(V - E + F = 0\\) with \\(V = 9\\), we get \\(F = E - 9\\). From \\(3F = 2E\\), we get \\(3(E - 9) = 2E\\), so \\(E = 27\\) and \\(F = 18\\). Check: \\(9 - 27 + 18 = 0\\). \\(\\checkmark\\)'
                },
                {
                    question: 'Prove that the Euler characteristic is unchanged when you add a diagonal to a face. That is, if a quadrilateral face is split into two triangles by adding an edge, show \\(\\Delta\\chi = 0\\).',
                    hint: 'Count the changes: \\(\\Delta V, \\Delta E, \\Delta F\\).',
                    solution: 'Adding a diagonal: \\(\\Delta V = 0\\) (no new vertices), \\(\\Delta E = +1\\) (one new edge), \\(\\Delta F = +1\\) (one face becomes two). So \\(\\Delta\\chi = 0 - 1 + 1 = 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Applications
        // ================================================================
        {
            id: 'sec-applications',
            title: 'Applications',
            content: `
<h2>Applications of Gauss-Bonnet</h2>

<p>The Gauss-Bonnet theorem has far-reaching consequences, from impossibility results in topology to practical constraints in geometry and physics.</p>

<h3>The Hairy Ball Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.4 (Hairy Ball Theorem)</div>
    <div class="env-body">
        <p>There is no continuous, non-vanishing tangent vector field on the 2-sphere \\(S^2\\).</p>
        <p>Equivalently: you cannot comb a hairy ball flat without creating a cowlick (a point where the vector field vanishes).</p>
    </div>
</div>

<p>This follows from the Poincare-Hopf theorem (next section) combined with Gauss-Bonnet: the sum of indices of any vector field on \\(S^2\\) must equal \\(\\chi(S^2) = 2 \\neq 0\\), so any vector field must have at least one zero.</p>

<div class="env-block remark">
    <div class="env-title">Real-World Consequence</div>
    <div class="env-body">
        <p>The hairy ball theorem implies that at any instant, there is at least one point on Earth where the horizontal wind velocity is exactly zero (a point of calm). This is not about the eye of a hurricane; it is a topological necessity. If the wind blows somewhere, it must vanish somewhere else.</p>
    </div>
</div>

<h3>Curvature Constraints</h3>

<div class="env-block example">
    <div class="env-title">Example: No Flat Torus in \\(\\mathbb{R}^3\\)</div>
    <div class="env-body">
        <p>Can a torus embedded in \\(\\mathbb{R}^3\\) have \\(K \\geq 0\\) everywhere? No. By Gauss-Bonnet, \\(\\int K \\, dA = 0\\), and since the torus is compact the integral of a non-negative function that integrates to zero forces \\(K = 0\\) everywhere. But a flat torus cannot be smoothly embedded in \\(\\mathbb{R}^3\\) (it can be immersed, but not embedded without self-intersection). Therefore any smooth embedding of a torus in \\(\\mathbb{R}^3\\) must have regions of negative curvature.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Positive Curvature Forces Sphere Topology</div>
    <div class="env-body">
        <p>If \\(K > 0\\) everywhere on a compact surface \\(S\\), then \\(\\int_S K \\, dA > 0\\), so \\(\\chi(S) > 0\\), which forces \\(g = 0\\). A compact surface with everywhere positive Gaussian curvature must be homeomorphic to a sphere.</p>
    </div>
</div>

<h3>Descartes' Angle Defect</h3>

<p>For a convex polyhedron, the <strong>angle defect</strong> at a vertex is \\(\\delta_v = 2\\pi - \\sum (\\text{face angles at } v)\\). Descartes discovered (c. 1630) that</p>
\\[
\\sum_{v} \\delta_v = 4\\pi.
\\]
<p>This is precisely the discrete version of Gauss-Bonnet: the curvature is concentrated at the vertices, and the total curvature equals \\(2\\pi\\chi = 4\\pi\\) for a sphere.</p>

<div class="viz-placeholder" data-viz="viz-hairy-ball"></div>
`,
            visualizations: [
                {
                    id: 'viz-hairy-ball',
                    title: 'Hairy Ball Theorem',
                    description: 'A vector field on the sphere must vanish somewhere. Watch the animated field and see the singularity.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 150
                        });

                        var fieldType = 0;
                        VizEngine.createButton(controls, 'Rotation field', function() { fieldType = 0; });
                        VizEngine.createButton(controls, 'Source-sink field', function() { fieldType = 1; });

                        function projectSphere(theta, phi, tilt) {
                            var x = Math.sin(theta) * Math.cos(phi);
                            var y = Math.sin(theta) * Math.sin(phi);
                            var z = Math.cos(theta);
                            var yp = y * Math.cos(tilt) - z * Math.sin(tilt);
                            var zp = y * Math.sin(tilt) + z * Math.cos(tilt);
                            return [x, yp, zp];
                        }

                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var time = t * 0.001;
                            var tilt = 0.5;

                            viz.screenText('Hairy Ball Theorem: Every vector field on S\u00B2 has a zero', viz.width / 2, 18, viz.colors.white, 13);

                            // Draw sphere
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            for (var i = 0; i <= 100; i++) {
                                var a = 2 * Math.PI * i / 100;
                                var sx = viz.originX + Math.cos(a) * viz.scale;
                                var sy = viz.originY - Math.sin(a) * viz.scale;
                                i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fill();

                            // Draw latitude lines
                            ctx.strokeStyle = viz.colors.grid + '33';
                            ctx.lineWidth = 0.5;
                            for (var lat = -60; lat <= 60; lat += 30) {
                                ctx.beginPath();
                                var started = false;
                                for (var lon = 0; lon <= 360; lon += 3) {
                                    var pr = projectSphere((90 - lat) * Math.PI / 180, lon * Math.PI / 180, tilt);
                                    if (pr[2] > 0) {
                                        var ss = [viz.originX + pr[0] * viz.scale, viz.originY - pr[1] * viz.scale];
                                        if (!started) { ctx.moveTo(ss[0], ss[1]); started = true; }
                                        else ctx.lineTo(ss[0], ss[1]);
                                    } else started = false;
                                }
                                ctx.stroke();
                            }

                            // Draw vector field arrows on visible hemisphere
                            var nTheta = 12, nPhi = 20;
                            for (var ti = 1; ti < nTheta; ti++) {
                                for (var pi2 = 0; pi2 < nPhi; pi2++) {
                                    var theta = Math.PI * ti / nTheta;
                                    var phi = 2 * Math.PI * pi2 / nPhi;

                                    var pt = projectSphere(theta, phi, tilt);
                                    if (pt[2] < 0.05) continue; // back-face

                                    var scrX = viz.originX + pt[0] * viz.scale;
                                    var scrY = viz.originY - pt[1] * viz.scale;

                                    // Tangent vector in spherical coords
                                    var vTheta, vPhi;
                                    if (fieldType === 0) {
                                        // Rotation around z-axis: v = dphi direction
                                        vTheta = 0;
                                        vPhi = 1;
                                    } else {
                                        // Source at north pole, sink at south pole
                                        vTheta = Math.sin(theta);
                                        vPhi = 0;
                                    }

                                    // Convert to 3D
                                    var eTheta = [Math.cos(theta)*Math.cos(phi), Math.cos(theta)*Math.sin(phi), -Math.sin(theta)];
                                    var ePhi = [-Math.sin(phi), Math.cos(phi), 0];

                                    var vx = vTheta * eTheta[0] + vPhi * ePhi[0];
                                    var vy = vTheta * eTheta[1] + vPhi * ePhi[1];
                                    var vz = vTheta * eTheta[2] + vPhi * ePhi[2];

                                    // Apply tilt rotation
                                    var vyp = vy * Math.cos(tilt) - vz * Math.sin(tilt);

                                    // Arrow size
                                    var mag = Math.sqrt(vx * vx + vyp * vyp);
                                    if (mag < 0.001) {
                                        // Singularity, draw a red dot
                                        ctx.fillStyle = viz.colors.red;
                                        ctx.beginPath();
                                        ctx.arc(scrX, scrY, 5, 0, Math.PI * 2);
                                        ctx.fill();
                                        continue;
                                    }
                                    var arrowLen = 12 * mag;
                                    var ux = vx / mag, uy = -vyp / mag; // screen coords (y flipped)

                                    // Animate with pulsing
                                    var pulse = 0.7 + 0.3 * Math.sin(time * 2 + phi);
                                    arrowLen *= pulse;

                                    ctx.strokeStyle = viz.colors.teal + 'aa';
                                    ctx.lineWidth = 1.2;
                                    ctx.beginPath();
                                    ctx.moveTo(scrX, scrY);
                                    ctx.lineTo(scrX + ux * arrowLen, scrY + uy * arrowLen);
                                    ctx.stroke();

                                    // Arrowhead
                                    var ax = scrX + ux * arrowLen;
                                    var ay = scrY + uy * arrowLen;
                                    var headAngle = Math.atan2(uy, ux);
                                    ctx.fillStyle = viz.colors.teal + 'aa';
                                    ctx.beginPath();
                                    ctx.moveTo(ax, ay);
                                    ctx.lineTo(ax - 5 * Math.cos(headAngle - 0.5), ay - 5 * Math.sin(headAngle - 0.5));
                                    ctx.lineTo(ax - 5 * Math.cos(headAngle + 0.5), ay - 5 * Math.sin(headAngle + 0.5));
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }

                            // Mark singularities
                            if (fieldType === 0) {
                                // Rotation field has zeros at poles
                                var northP = projectSphere(0.001, 0, tilt);
                                var southP = projectSphere(Math.PI - 0.001, 0, tilt);
                                if (northP[2] > 0) {
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.beginPath();
                                    ctx.arc(viz.originX + northP[0] * viz.scale, viz.originY - northP[1] * viz.scale, 6, 0, Math.PI * 2);
                                    ctx.fill();
                                    viz.screenText('Zero (index +1)', viz.originX + northP[0] * viz.scale + 15, viz.originY - northP[1] * viz.scale, viz.colors.red, 10, 'left');
                                }
                                if (southP[2] > 0) {
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.beginPath();
                                    ctx.arc(viz.originX + southP[0] * viz.scale, viz.originY - southP[1] * viz.scale, 6, 0, Math.PI * 2);
                                    ctx.fill();
                                    viz.screenText('Zero (index +1)', viz.originX + southP[0] * viz.scale + 15, viz.originY - southP[1] * viz.scale, viz.colors.red, 10, 'left');
                                }
                                viz.screenText('Rotation field: zeros at both poles, each index +1, sum = 2 = \u03C7(S\u00B2)', viz.width / 2, viz.height - 22, viz.colors.text, 11);
                            } else {
                                var northP2 = projectSphere(0.001, 0, tilt);
                                var southP2 = projectSphere(Math.PI - 0.001, 0, tilt);
                                if (northP2[2] > 0) {
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.beginPath();
                                    ctx.arc(viz.originX + northP2[0] * viz.scale, viz.originY - northP2[1] * viz.scale, 6, 0, Math.PI * 2);
                                    ctx.fill();
                                    viz.screenText('Source (index +1)', viz.originX + northP2[0] * viz.scale + 15, viz.originY - northP2[1] * viz.scale, viz.colors.red, 10, 'left');
                                }
                                if (southP2[2] > 0) {
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.beginPath();
                                    ctx.arc(viz.originX + southP2[0] * viz.scale, viz.originY - southP2[1] * viz.scale, 6, 0, Math.PI * 2);
                                    ctx.fill();
                                    viz.screenText('Sink (index +1)', viz.originX + southP2[0] * viz.scale + 15, viz.originY - southP2[1] * viz.scale, viz.colors.red, 10, 'left');
                                }
                                viz.screenText('Source-sink field: source at N (index +1), sink at S (index +1), sum = 2 = \u03C7(S\u00B2)', viz.width / 2, viz.height - 22, viz.colors.text, 11);
                            }
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Can there exist a smooth surface in \\(\\mathbb{R}^3\\) homeomorphic to a sphere with \\(K \\leq 0\\) everywhere?',
                    hint: 'What does Gauss-Bonnet say about \\(\\int K \\, dA\\) for a sphere?',
                    solution: 'No. By Gauss-Bonnet, \\(\\int_S K \\, dA = 2\\pi\\chi(S^2) = 4\\pi > 0\\). If \\(K \\leq 0\\) everywhere, the integral would be \\(\\leq 0\\), a contradiction.'
                },
                {
                    question: 'Use the Descartes angle defect theorem to compute the sum of angle defects for a cube.',
                    hint: 'At each vertex of a cube, three squares meet. Each square contributes a right angle (\\(\\pi/2\\)).',
                    solution: 'At each vertex, three face angles of \\(\\pi/2\\) meet, so the angle sum is \\(3\\pi/2\\). The defect is \\(\\delta_v = 2\\pi - 3\\pi/2 = \\pi/2\\). The cube has 8 vertices, so \\(\\sum \\delta_v = 8 \\cdot \\pi/2 = 4\\pi\\). \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Index of Vector Fields
        // ================================================================
        {
            id: 'sec-index',
            title: 'Index of Vector Fields',
            content: `
<h2>Index of Vector Fields and the Poincare-Hopf Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">Winding Around a Singularity</div>
    <div class="env-body">
        <p>Consider a tangent vector field on a surface. At an isolated zero (singularity), the field vectors nearby "swirl" around the zero. The <strong>index</strong> of the singularity measures how many times the field rotates as you walk a small loop around it. A source or sink has index +1. A saddle point has index -1. The Poincare-Hopf theorem says that the sum of all indices equals the Euler characteristic, regardless of which vector field you choose.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Index of an Isolated Zero)</div>
    <div class="env-body">
        <p>Let \\(\\mathbf{v}\\) be a tangent vector field on a surface \\(S\\) with an isolated zero at \\(p\\). Choose a small simple closed curve \\(\\gamma\\) enclosing \\(p\\) and no other zeros. As we traverse \\(\\gamma\\) once counterclockwise, the field direction rotates by \\(2\\pi k\\) for some integer \\(k\\). This integer \\(k\\) is the <strong>index</strong> of \\(\\mathbf{v}\\) at \\(p\\), denoted \\(\\text{ind}_p(\\mathbf{v})\\).</p>
    </div>
</div>

<p>Common types of singularities:</p>
<ul>
    <li><strong>Source:</strong> vectors point outward. Index = +1.</li>
    <li><strong>Sink:</strong> vectors point inward. Index = +1.</li>
    <li><strong>Center/vortex:</strong> vectors circulate around. Index = +1.</li>
    <li><strong>Saddle:</strong> vectors exhibit a hyperbolic pattern. Index = -1.</li>
    <li><strong>Higher-order zero:</strong> field rotates \\(k\\) times. Index = \\(k\\).</li>
</ul>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.5 (Poincare-Hopf)</div>
    <div class="env-body">
        <p>Let \\(S\\) be a compact oriented surface without boundary, and \\(\\mathbf{v}\\) a tangent vector field on \\(S\\) with finitely many zeros \\(p_1, \\ldots, p_m\\). Then</p>
        \\[\\sum_{i=1}^{m} \\text{ind}_{p_i}(\\mathbf{v}) = \\chi(S).\\]
    </div>
</div>

<p>This is a stunning generalization of the hairy ball theorem. On the sphere (\\(\\chi = 2\\)), any vector field must have zeros whose indices sum to 2. On the torus (\\(\\chi = 0\\)), a vector field with no zeros is possible (and we can construct one explicitly). On a genus-2 surface (\\(\\chi = -2\\)), any vector field must have zeros whose indices sum to \\(-2\\).</p>

<div class="env-block example">
    <div class="env-title">Example: Vector Fields on the Torus</div>
    <div class="env-body">
        <p>The torus admits a non-vanishing vector field: take the tangent to circles of constant latitude (the "horizontal" direction). Since \\(\\chi = 0\\), Poincare-Hopf is satisfied with an empty sum. Alternatively, a field with one source (index +1) and one saddle (index -1) would also work: \\(+1 + (-1) = 0\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-poincare-hopf"></div>
`,
            visualizations: [
                {
                    id: 'viz-poincare-hopf',
                    title: 'Poincare-Hopf on the Torus',
                    description: 'A vector field on the torus with singularities. The sum of indices equals the Euler characteristic (0 for a torus).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var showField = 0; // 0 = no zeros, 1 = source+saddle
                        VizEngine.createButton(controls, 'No zeros (\u03C7=0)', function() { showField = 0; });
                        VizEngine.createButton(controls, 'Source + Saddle', function() { showField = 1; });

                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var time = t * 0.001;

                            viz.screenText('Vector Fields on the Torus: \u03C7 = 0', viz.width / 2, 18, viz.colors.white, 14);

                            // Draw torus in 2D representation (fundamental domain)
                            var cx = viz.width / 2;
                            var cy = 210;
                            var W = 200, H = 160;

                            // Background rectangle (fundamental domain)
                            ctx.fillStyle = viz.colors.grid + '33';
                            ctx.fillRect(cx - W, cy - H, 2 * W, 2 * H);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(cx - W, cy - H, 2 * W, 2 * H);

                            // Identification arrows on edges
                            ctx.fillStyle = viz.colors.teal;
                            // Top/bottom identified
                            var arrSize = 8;
                            // Right arrow on top
                            ctx.beginPath();
                            ctx.moveTo(cx + 10, cy - H - 5);
                            ctx.lineTo(cx + 10 - arrSize, cy - H - 5 - arrSize/2);
                            ctx.lineTo(cx + 10 - arrSize, cy - H - 5 + arrSize/2);
                            ctx.closePath(); ctx.fill();
                            // Right arrow on bottom
                            ctx.beginPath();
                            ctx.moveTo(cx + 10, cy + H + 5);
                            ctx.lineTo(cx + 10 - arrSize, cy + H + 5 - arrSize/2);
                            ctx.lineTo(cx + 10 - arrSize, cy + H + 5 + arrSize/2);
                            ctx.closePath(); ctx.fill();
                            // Up arrow on left
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(cx - W - 5, cy - 10);
                            ctx.lineTo(cx - W - 5 - arrSize/2, cy - 10 + arrSize);
                            ctx.lineTo(cx - W - 5 + arrSize/2, cy - 10 + arrSize);
                            ctx.closePath(); ctx.fill();
                            // Up arrow on right
                            ctx.beginPath();
                            ctx.moveTo(cx + W + 5, cy - 10);
                            ctx.lineTo(cx + W + 5 - arrSize/2, cy - 10 + arrSize);
                            ctx.lineTo(cx + W + 5 + arrSize/2, cy - 10 + arrSize);
                            ctx.closePath(); ctx.fill();

                            viz.screenText('Fundamental domain', cx, cy - H - 18, viz.colors.text, 10);

                            // Draw vector field
                            var nX = 14, nY = 11;
                            for (var ix = 0; ix < nX; ix++) {
                                for (var iy = 0; iy < nY; iy++) {
                                    var fx = (ix + 0.5) / nX; // 0 to 1
                                    var fy = (iy + 0.5) / nY;
                                    var px = cx - W + fx * 2 * W;
                                    var py = cy - H + fy * 2 * H;

                                    var vx2, vy2;
                                    if (showField === 0) {
                                        // Constant field (horizontal), no zeros
                                        vx2 = 1;
                                        vy2 = 0;
                                    } else {
                                        // Field with source at (0.3, 0.5) and saddle at (0.7, 0.5)
                                        var srcX = 0.3, srcY = 0.5;
                                        var sadX = 0.7, sadY = 0.5;
                                        // Source contribution
                                        var dsx = fx - srcX, dsy = fy - srcY;
                                        var dsr = Math.sqrt(dsx*dsx + dsy*dsy) + 0.05;
                                        // Saddle contribution
                                        var ddx = fx - sadX, ddy = fy - sadY;
                                        var ddr = Math.sqrt(ddx*ddx + ddy*ddy) + 0.05;

                                        vx2 = dsx/(dsr*dsr) + (ddx*ddx - ddy*ddy)/(ddr*ddr*ddr) * 0.5;
                                        vy2 = dsy/(dsr*dsr) + (2*ddx*ddy)/(ddr*ddr*ddr) * 0.5;
                                    }

                                    var mag = Math.sqrt(vx2*vx2 + vy2*vy2);
                                    if (mag < 0.001) {
                                        ctx.fillStyle = viz.colors.red;
                                        ctx.beginPath();
                                        ctx.arc(px, py, 4, 0, Math.PI * 2);
                                        ctx.fill();
                                        continue;
                                    }
                                    var ux = vx2 / mag, uy = vy2 / mag;
                                    var arrowLen = Math.min(12, 8 * Math.min(mag, 2));

                                    // Animate
                                    var pulse = 0.7 + 0.3 * Math.sin(time * 2 + fx * 4 + fy * 3);
                                    arrowLen *= pulse;

                                    ctx.strokeStyle = viz.colors.blue + '99';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(px, py);
                                    ctx.lineTo(px + ux * arrowLen, py + uy * arrowLen);
                                    ctx.stroke();

                                    var headAngle = Math.atan2(uy, ux);
                                    ctx.fillStyle = viz.colors.blue + '99';
                                    ctx.beginPath();
                                    ctx.moveTo(px + ux * arrowLen, py + uy * arrowLen);
                                    ctx.lineTo(px + ux * arrowLen - 4*Math.cos(headAngle-0.5), py + uy * arrowLen - 4*Math.sin(headAngle-0.5));
                                    ctx.lineTo(px + ux * arrowLen - 4*Math.cos(headAngle+0.5), py + uy * arrowLen - 4*Math.sin(headAngle+0.5));
                                    ctx.closePath(); ctx.fill();
                                }
                            }

                            // Mark singularities for source+saddle
                            if (showField === 1) {
                                // Source
                                var srcPx = cx - W + 0.3 * 2 * W;
                                var srcPy = cy - H + 0.5 * 2 * H;
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.arc(srcPx, srcPy, 6, 0, Math.PI * 2);
                                ctx.fill();
                                viz.screenText('Source (ind = +1)', srcPx, srcPy - 14, viz.colors.red, 10);

                                // Saddle
                                var sadPx = cx - W + 0.7 * 2 * W;
                                var sadPy = cy - H + 0.5 * 2 * H;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.arc(sadPx, sadPy, 6, 0, Math.PI * 2);
                                ctx.fill();
                                viz.screenText('Saddle (ind = -1)', sadPx, sadPy - 14, viz.colors.orange, 10);
                            }

                            // Summary
                            var sumY = viz.height - 30;
                            if (showField === 0) {
                                viz.screenText('Constant field: no zeros. Sum of indices = 0 = \u03C7(T\u00B2).', viz.width / 2, sumY, viz.colors.teal, 12);
                            } else {
                                viz.screenText('Source (ind +1) + Saddle (ind -1) = 0 = \u03C7(T\u00B2).', viz.width / 2, sumY, viz.colors.teal, 12);
                            }
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A vector field on a genus-2 surface has three saddle points (index \\(-1\\) each) and some sources (index \\(+1\\) each). How many sources must it have?',
                    hint: 'Use \\(\\chi = 2 - 2g = -2\\) for genus 2, and Poincare-Hopf.',
                    solution: 'Let \\(n\\) be the number of sources. By Poincare-Hopf: \\(n \\cdot (+1) + 3 \\cdot (-1) = \\chi = -2\\). So \\(n - 3 = -2\\), giving \\(n = 1\\). There must be exactly 1 source.'
                },
                {
                    question: 'Prove that a compact oriented surface \\(S\\) admits a non-vanishing tangent vector field if and only if \\(\\chi(S) = 0\\).',
                    hint: 'One direction uses Poincare-Hopf. For the other, construct a constant vector field on the fundamental domain of a torus.',
                    solution: '(\\(\\Rightarrow\\)) If \\(\\mathbf{v}\\) has no zeros, the sum of indices is an empty sum = 0, so \\(\\chi(S) = 0\\) by Poincare-Hopf. (\\(\\Leftarrow\\)) If \\(\\chi(S) = 0\\), then \\(g = 1\\) (torus). On the flat torus \\(\\mathbb{R}^2/\\mathbb{Z}^2\\), the constant field \\(\\mathbf{v} = \\partial/\\partial x\\) is well-defined and non-vanishing. More generally, any orientable surface with \\(\\chi = 0\\) is a torus, which admits such a field.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Riemannian Geometry
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Bridge to What Comes Next',
            content: `
<h2>Bridge: From Surfaces to Manifolds</h2>

<div class="env-block intuition">
    <div class="env-title">The Deeper Story</div>
    <div class="env-body">
        <p>The Gauss-Bonnet theorem is the culmination of classical surface theory. It reveals that geometry and topology are not separate disciplines but deeply intertwined. As we move from surfaces in \\(\\mathbb{R}^3\\) to abstract Riemannian manifolds, this insight will only deepen.</p>
    </div>
</div>

<h3>What We Have Achieved</h3>

<p>Starting from curves in \\(\\mathbb{R}^n\\), we built up the theory of surfaces step by step:</p>
<ol>
    <li><strong>Local geometry</strong>: the first and second fundamental forms capture how a surface bends</li>
    <li><strong>Intrinsic geometry</strong>: Gauss's Theorema Egregium showed that Gaussian curvature is intrinsic</li>
    <li><strong>Global topology</strong>: Gauss-Bonnet bridges curvature to topology via \\(\\int K \\, dA = 2\\pi\\chi\\)</li>
</ol>

<h3>What Comes Next</h3>

<p>The remainder of this course develops the abstract framework that generalizes all of the above to higher dimensions:</p>

<ul>
    <li><strong>Smooth manifolds</strong> (Ch 11-13): abstract spaces that look locally like \\(\\mathbb{R}^n\\), equipped with tangent spaces, differential forms, and integration</li>
    <li><strong>Riemannian geometry</strong> (Ch 14-17): manifolds with a metric (inner product on tangent spaces), connections, parallel transport, and curvature tensors</li>
    <li><strong>Global results</strong> (Ch 18-19): Jacobi fields, comparison theorems, and the deep relationship between curvature and topology in all dimensions</li>
</ul>

<p>The Gauss-Bonnet theorem generalizes to the <strong>Chern-Gauss-Bonnet theorem</strong> in higher even dimensions, connecting the Pfaffian of the curvature form to the Euler characteristic. The Poincare-Hopf theorem generalizes directly to all dimensions. These are not just technical extensions; they are fundamental tools in modern geometry, topology, and theoretical physics.</p>

<div class="env-block remark">
    <div class="env-title">The Big Picture</div>
    <div class="env-body">
        <p>Gauss-Bonnet is the prototype of an <strong>index theorem</strong>: a result that equates an analytic quantity (computed by integration) with a topological quantity (computed by counting). The Atiyah-Singer index theorem (1963) vastly generalizes this idea, connecting the analysis of differential operators on manifolds to topological invariants. It is one of the deepest theorems in 20th-century mathematics, with applications from number theory to quantum field theory.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-curvature-topology"></div>
`,
            visualizations: [
                {
                    id: 'viz-curvature-topology',
                    title: 'Total Curvature is a Topological Invariant',
                    description: 'Deform a surface continuously: the total curvature stays the same as long as the topology does not change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 120
                        });

                        var deform = 0;
                        VizEngine.createSlider(controls, 'Deformation', 0, 1, deform, 0.02, function(v) {
                            deform = v;
                        });

                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var time = t * 0.001;

                            viz.screenText('Deforming a Surface: Total Curvature = 2\u03C0\u03C7 (invariant)', viz.width / 2, 18, viz.colors.white, 13);

                            // Draw a deformed sphere/ellipsoid
                            // parametrize: x = (1 + d*cos(2*theta)) * sin(theta) * cos(phi)
                            // etc., showing that total curvature stays 4*pi

                            var nU = 30, nV = 60;
                            var tilt = 0.5;

                            function surfacePoint(theta, phi) {
                                var r = 1 + deform * 0.5 * Math.cos(2 * theta) * Math.cos(3 * phi);
                                var x = r * Math.sin(theta) * Math.cos(phi);
                                var y = r * Math.sin(theta) * Math.sin(phi);
                                var z = r * Math.cos(theta);
                                // Apply tilt
                                var yp = y * Math.cos(tilt) - z * Math.sin(tilt);
                                var zp = y * Math.sin(tilt) + z * Math.cos(tilt);
                                return [x, yp, zp];
                            }

                            // Draw wireframe of deformed sphere
                            // Latitude lines
                            for (var ui = 1; ui < nU; ui++) {
                                var theta = Math.PI * ui / nU;
                                ctx.beginPath();
                                var started = false;
                                for (var vi = 0; vi <= nV; vi++) {
                                    var phi = 2 * Math.PI * vi / nV;
                                    var pt = surfacePoint(theta, phi);
                                    if (pt[2] > -0.1) {
                                        var sx = viz.originX + pt[0] * viz.scale;
                                        var sy = viz.originY - pt[1] * viz.scale;
                                        if (!started) { ctx.moveTo(sx, sy); started = true; }
                                        else ctx.lineTo(sx, sy);
                                    } else { started = false; }
                                }
                                ctx.strokeStyle = viz.colors.blue + (pt[2] > 0 ? '44' : '22');
                                ctx.lineWidth = 0.8;
                                ctx.stroke();
                            }
                            // Longitude lines
                            for (var vi2 = 0; vi2 < nV; vi2 += 3) {
                                var phi2 = 2 * Math.PI * vi2 / nV;
                                ctx.beginPath();
                                var started2 = false;
                                for (var ui2 = 0; ui2 <= nU; ui2++) {
                                    var theta2 = Math.PI * ui2 / nU;
                                    var pt2 = surfacePoint(theta2, phi2);
                                    if (pt2[2] > -0.1) {
                                        var sx2 = viz.originX + pt2[0] * viz.scale;
                                        var sy2 = viz.originY - pt2[1] * viz.scale;
                                        if (!started2) { ctx.moveTo(sx2, sy2); started2 = true; }
                                        else ctx.lineTo(sx2, sy2);
                                    } else { started2 = false; }
                                }
                                ctx.strokeStyle = viz.colors.teal + '33';
                                ctx.lineWidth = 0.6;
                                ctx.stroke();
                            }

                            // Outline (silhouette)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            // Approximate silhouette by finding points where z ~ 0
                            for (var si = 0; si <= 200; si++) {
                                var phi3 = 2 * Math.PI * si / 200;
                                // For silhouette, find theta where z component = 0
                                // Binary search
                                var lo = 0, hi = Math.PI, bestTheta = Math.PI/2;
                                for (var iter = 0; iter < 20; iter++) {
                                    var mid = (lo + hi) / 2;
                                    var pm = surfacePoint(mid, phi3);
                                    if (pm[2] > 0) lo = mid; else hi = mid;
                                }
                                bestTheta = (lo + hi) / 2;
                                var ptS = surfacePoint(bestTheta, phi3);
                                var sxS = viz.originX + ptS[0] * viz.scale;
                                var syS = viz.originY - ptS[1] * viz.scale;
                                si === 0 ? ctx.moveTo(sxS, syS) : ctx.lineTo(sxS, syS);
                            }
                            ctx.closePath();
                            ctx.stroke();

                            // Color-code regions of positive/negative curvature
                            // (schematic - shade the front face)
                            for (var gi = 0; gi < 20; gi++) {
                                for (var gj = 0; gj < 40; gj++) {
                                    var th = Math.PI * (gi + 0.5) / 20;
                                    var ph = 2 * Math.PI * (gj + 0.5) / 40;
                                    var gpt = surfacePoint(th, ph);
                                    if (gpt[2] < 0.2) continue;

                                    // Approximate curvature sign: for sphere deformation,
                                    // positive near poles, can go negative where we push in
                                    var r2 = 1 + deform * 0.5 * Math.cos(2*th) * Math.cos(3*ph);
                                    // Heuristic: curvature decreases where surface is convex outward
                                    var kApprox = 1 / (r2 * r2); // rough proxy
                                    if (deform > 0.1) {
                                        // Some regions become saddle-like
                                        var drdth = -deform * 0.5 * 2 * Math.sin(2*th) * Math.cos(3*ph);
                                        var drdph = -deform * 0.5 * 3 * Math.cos(2*th) * Math.sin(3*ph);
                                        kApprox -= 0.3 * (drdth*drdth + drdph*drdph);
                                    }

                                    var gsx = viz.originX + gpt[0] * viz.scale;
                                    var gsy = viz.originY - gpt[1] * viz.scale;
                                    if (kApprox > 0.01) {
                                        ctx.fillStyle = viz.colors.blue + '18';
                                    } else if (kApprox < -0.01) {
                                        ctx.fillStyle = viz.colors.red + '18';
                                    } else {
                                        continue;
                                    }
                                    ctx.fillRect(gsx - 4, gsy - 3, 8, 6);
                                }
                            }

                            // Info at bottom
                            viz.screenText(
                                'Deformation: ' + (deform * 100).toFixed(0) + '%',
                                viz.width / 2 - 140, viz.height - 55, viz.colors.text, 12
                            );
                            viz.screenText(
                                '\u222B K dA = 4\u03C0 (always, as long as topology = sphere)',
                                viz.width / 2, viz.height - 35, viz.colors.teal, 13
                            );
                            viz.screenText(
                                'Blue = K > 0     Red = K < 0     Net always = 4\u03C0',
                                viz.width / 2, viz.height - 15, viz.colors.text, 11
                            );
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'State the generalization of Gauss-Bonnet to a compact surface \\(S\\) with boundary \\(\\partial S\\). What is the formula?',
                    hint: 'Combine the local Gauss-Bonnet with the Euler characteristic. For a surface with boundary, \\(\\chi\\) still makes sense.',
                    solution: 'For a compact oriented surface \\(S\\) with smooth boundary \\(\\partial S\\): \\(\\int_S K \\, dA + \\int_{\\partial S} \\kappa_g \\, ds = 2\\pi \\chi(S)\\). For example, a disk has \\(\\chi = 1\\), so \\(\\int_D K \\, dA + \\int_{\\partial D} \\kappa_g \\, ds = 2\\pi\\), which is the local Gauss-Bonnet for the entire disk.'
                },
                {
                    question: 'The Atiyah-Singer index theorem generalizes Gauss-Bonnet. In what sense? Give a one-sentence description of the analogy.',
                    hint: 'Gauss-Bonnet equates an integral (analytic) with a topological invariant. Atiyah-Singer does the same for differential operators.',
                    solution: 'The Atiyah-Singer index theorem equates the analytic index of an elliptic differential operator (defined via analysis: dim ker minus dim coker) with a topological index (computed from characteristic classes of the manifold), generalizing how Gauss-Bonnet equates \\(\\int K \\, dA\\) (analytic) with \\(2\\pi\\chi\\) (topological).'
                },
                {
                    question: 'Suppose a closed surface \\(S\\) has Gaussian curvature satisfying \\(K \\geq 1\\) everywhere. What can you say about the area of \\(S\\)?',
                    hint: 'Gauss-Bonnet constrains the total curvature. Since \\(K \\geq 1\\), what upper bound does that give for the area?',
                    solution: 'By Gauss-Bonnet, \\(\\int_S K \\, dA = 2\\pi\\chi(S)\\). Since \\(K > 0\\), we need \\(\\chi(S) > 0\\), so \\(\\chi(S) = 2\\) (sphere). Then \\(4\\pi = \\int K \\, dA \\geq 1 \\cdot \\text{Area}(S)\\), so \\(\\text{Area}(S) \\leq 4\\pi\\). Equality holds only for the unit sphere (constant \\(K = 1\\)).'
                }
            ]
        }
    ]
});
