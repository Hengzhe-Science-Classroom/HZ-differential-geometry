window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch02',
    number: 2,
    title: 'The Frenet-Serret Frame',
    subtitle: 'The moving frame that captures all curve geometry',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why a Moving Frame?</h2>

<div class="env-block intuition">
    <div class="env-title">The Driver's Perspective</div>
    <div class="env-body">
        <p>Imagine driving along a winding mountain road. At every instant you have a natural coordinate system attached to your car: the direction you are heading (tangent), the direction the road is curving toward (normal), and the direction perpendicular to both (binormal, pointing roughly "up" when the road is flat). This coordinate system <em>moves with you</em> and rotates as the road bends and twists. The Frenet-Serret frame makes this intuition precise.</p>
    </div>
</div>

<p>In Chapter 1 we defined curvature \\(\\kappa\\) and torsion \\(\\tau\\) as scalar invariants of a curve. But scalars alone do not tell us <em>how</em> a curve bends; we also need <em>directions</em>. The Frenet-Serret frame provides an orthonormal basis \\(\\{\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\}\\) at each point of a curve, adapted to the curve's geometry. Together with the Frenet-Serret equations, this frame captures <strong>all</strong> the local geometry of a space curve.</p>

<h3>From Invariants to a Frame</h3>

<p>Recall that for a unit-speed curve \\(\\alpha(s)\\) in \\(\\mathbb{R}^3\\):</p>
<ul>
    <li>The <strong>curvature</strong> \\(\\kappa(s) = \\|\\alpha''(s)\\|\\) measures how fast the curve turns.</li>
    <li>The <strong>torsion</strong> \\(\\tau(s)\\) measures how fast the curve twists out of its osculating plane.</li>
</ul>

<p>But \\(\\kappa\\) and \\(\\tau\\) are numbers; they tell us magnitudes, not directions. To fully describe the geometry, we need a basis that knows <em>which way</em> the curve is turning and <em>which way</em> it is twisting. That basis is the Frenet-Serret frame.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Jean Frederic Frenet presented his formulas in a doctoral thesis in 1847 but did not publish them until 1852. Joseph Alfred Serret independently discovered them in 1851. The concept of a moving frame was later vastly generalized by Elie Cartan into the method of moving frames, one of the most powerful tools in differential geometry.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-frenet-frame"></div>
`,
            visualizations: [
                // === VIZ 1: THE SHOWPIECE — Animated TNB frame on 3D curve ===
                {
                    id: 'viz-frenet-frame',
                    title: 'The Moving Frenet Frame',
                    description: 'Watch the TNB frame (tangent, normal, binormal) glide along a 3D space curve. The red arrow is T (tangent), green is N (principal normal), and blue is B (binormal). The frame rotates as the curve bends and twists.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 240, scale: 55
                        });

                        var t0 = 0;
                        var speed = 0.4;
                        var curveType = 0; // 0: trefoil-like, 1: figure-8 knot
                        var animating = true;

                        VizEngine.createSlider(controls, 'Speed', 0, 1.5, speed, 0.1, function(v) { speed = v; });
                        VizEngine.createButton(controls, 'Pause / Play', function() { animating = !animating; });
                        VizEngine.createButton(controls, 'Switch Curve', function() { curveType = (curveType + 1) % 2; });

                        // Oblique projection (cabinet-style)
                        var angle = 0.7;
                        var ca = Math.cos(angle), sa = Math.sin(angle);
                        function project(x, y, z) {
                            return [x + 0.4 * z * ca, y + 0.4 * z * sa];
                        }

                        // Curve parametrizations
                        function curve(tt) {
                            if (curveType === 0) {
                                // Trefoil-like knot on torus
                                var R = 2.5, r = 0.9;
                                var p = 2, q = 3;
                                return [
                                    (R + r * Math.cos(q * tt)) * Math.cos(p * tt),
                                    (R + r * Math.cos(q * tt)) * Math.sin(p * tt),
                                    r * Math.sin(q * tt)
                                ];
                            } else {
                                // Lissajous-like space curve
                                return [
                                    2.2 * Math.sin(tt),
                                    2.2 * Math.sin(2 * tt),
                                    1.5 * Math.cos(3 * tt)
                                ];
                            }
                        }

                        function curveDerivative(tt) {
                            var h = 0.0001;
                            var c1 = curve(tt - h), c2 = curve(tt + h);
                            return [(c2[0]-c1[0])/(2*h), (c2[1]-c1[1])/(2*h), (c2[2]-c1[2])/(2*h)];
                        }

                        function curveSecondDerivative(tt) {
                            var h = 0.0001;
                            var c0 = curve(tt-h), c1 = curve(tt), c2 = curve(tt+h);
                            return [(c2[0]-2*c1[0]+c0[0])/(h*h), (c2[1]-2*c1[1]+c0[1])/(h*h), (c2[2]-2*c1[2]+c0[2])/(h*h)];
                        }

                        function norm3(v) { return Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]); }
                        function scale3(v, s) { return [v[0]*s, v[1]*s, v[2]*s]; }
                        function cross3(a, b) { return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]; }
                        function sub3(a, b) { return [a[0]-b[0], a[1]-b[1], a[2]-b[2]]; }
                        function add3(a, b) { return [a[0]+b[0], a[1]+b[1], a[2]+b[2]]; }

                        function frenetFrame(tt) {
                            var r = curve(tt);
                            var dr = curveDerivative(tt);
                            var ddr = curveSecondDerivative(tt);
                            var ndr = norm3(dr);
                            if (ndr < 1e-10) return null;
                            var T = scale3(dr, 1/ndr);

                            // N = (dr x ddr) x dr, normalized
                            var B_raw = cross3(dr, ddr);
                            var nB = norm3(B_raw);
                            if (nB < 1e-10) return { pos: r, T: T, N: [0,0,1], B: cross3(T, [0,0,1]) };
                            var B = scale3(B_raw, 1/nB);
                            var N = cross3(B, T);
                            return { pos: r, T: T, N: N, B: B };
                        }

                        function drawArrow3D(ctx, origin, dir, len, color, label) {
                            var tip = add3(origin, scale3(dir, len));
                            var p0 = project(origin[0], origin[1], origin[2]);
                            var p1 = project(tip[0], tip[1], tip[2]);
                            var sx0 = viz.originX + p0[0] * viz.scale;
                            var sy0 = viz.originY - p0[1] * viz.scale;
                            var sx1 = viz.originX + p1[0] * viz.scale;
                            var sy1 = viz.originY - p1[1] * viz.scale;

                            var dx = sx1 - sx0, dy = sy1 - sy0;
                            var len2d = Math.sqrt(dx*dx + dy*dy);
                            if (len2d < 2) return;
                            var ang = Math.atan2(dy, dx);

                            ctx.strokeStyle = color; ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(sx0, sy0); ctx.lineTo(sx1, sy1); ctx.stroke();

                            ctx.fillStyle = color; ctx.beginPath();
                            ctx.moveTo(sx1, sy1);
                            ctx.lineTo(sx1 - 10*Math.cos(ang-0.35), sy1 - 10*Math.sin(ang-0.35));
                            ctx.lineTo(sx1 - 10*Math.cos(ang+0.35), sy1 - 10*Math.sin(ang+0.35));
                            ctx.closePath(); ctx.fill();

                            if (label) {
                                ctx.fillStyle = color;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText(label, sx1 + 12*Math.cos(ang), sy1 + 12*Math.sin(ang));
                            }
                        }

                        viz.animate(function(timestamp) {
                            if (animating) t0 += speed * 0.016;
                            viz.clear();
                            var ctx = viz.ctx;

                            // Title
                            viz.screenText('The Frenet-Serret Frame on a Space Curve', viz.width/2, 18, viz.colors.white, 15);

                            // Draw the curve
                            ctx.strokeStyle = viz.colors.white + '55'; ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            var steps = 400;
                            for (var i = 0; i <= steps; i++) {
                                var tt = (i / steps) * 2 * Math.PI;
                                var pt = curve(tt);
                                var pp = project(pt[0], pt[1], pt[2]);
                                var sx = viz.originX + pp[0] * viz.scale;
                                var sy = viz.originY - pp[1] * viz.scale;
                                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Trail highlighting
                            var tCur = t0 % (2*Math.PI);
                            ctx.strokeStyle = viz.colors.yellow + '88'; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var trailLen = 60;
                            for (var j = 0; j <= trailLen; j++) {
                                var tt2 = tCur - (trailLen - j) * 0.015;
                                var pt2 = curve(tt2);
                                var pp2 = project(pt2[0], pt2[1], pt2[2]);
                                var sx2 = viz.originX + pp2[0] * viz.scale;
                                var sy2 = viz.originY - pp2[1] * viz.scale;
                                if (j === 0) ctx.moveTo(sx2, sy2); else ctx.lineTo(sx2, sy2);
                            }
                            ctx.stroke();

                            // Frame at current point
                            var frame = frenetFrame(tCur);
                            if (frame) {
                                var arrowLen = 1.0;
                                // Draw point
                                var pp3 = project(frame.pos[0], frame.pos[1], frame.pos[2]);
                                var sx3 = viz.originX + pp3[0] * viz.scale;
                                var sy3 = viz.originY - pp3[1] * viz.scale;
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath(); ctx.arc(sx3, sy3, 5, 0, Math.PI*2); ctx.fill();

                                // T (red), N (green), B (blue)
                                drawArrow3D(ctx, frame.pos, frame.T, arrowLen, viz.colors.red, 'T');
                                drawArrow3D(ctx, frame.pos, frame.N, arrowLen, viz.colors.green, 'N');
                                drawArrow3D(ctx, frame.pos, frame.B, arrowLen, viz.colors.blue, 'B');

                                // Osculating plane hint
                                ctx.fillStyle = viz.colors.purple + '12';
                                ctx.beginPath();
                                var planeR = 0.7;
                                var corners = [
                                    add3(frame.pos, add3(scale3(frame.T, planeR), scale3(frame.N, planeR))),
                                    add3(frame.pos, add3(scale3(frame.T, -planeR), scale3(frame.N, planeR))),
                                    add3(frame.pos, add3(scale3(frame.T, -planeR), scale3(frame.N, -planeR))),
                                    add3(frame.pos, add3(scale3(frame.T, planeR), scale3(frame.N, -planeR)))
                                ];
                                for (var c = 0; c < 4; c++) {
                                    var cp = project(corners[c][0], corners[c][1], corners[c][2]);
                                    var csx = viz.originX + cp[0] * viz.scale;
                                    var csy = viz.originY - cp[1] * viz.scale;
                                    if (c === 0) ctx.moveTo(csx, csy); else ctx.lineTo(csx, csy);
                                }
                                ctx.closePath(); ctx.fill();
                            }

                            // Legend
                            viz.screenText('T', 30, viz.height - 55, viz.colors.red, 13);
                            viz.screenText('= tangent', 72, viz.height - 55, viz.colors.text, 11);
                            viz.screenText('N', 30, viz.height - 37, viz.colors.green, 13);
                            viz.screenText('= normal', 72, viz.height - 37, viz.colors.text, 11);
                            viz.screenText('B', 30, viz.height - 19, viz.colors.blue, 13);
                            viz.screenText('= binormal', 72, viz.height - 19, viz.colors.text, 11);
                            viz.screenText(curveType === 0 ? 'Torus knot' : 'Lissajous curve', viz.width - 80, viz.height - 19, viz.colors.text, 10);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain in your own words why a single scalar (curvature) is not enough to describe the geometry of a space curve. What additional information does the Frenet frame provide?',
                    hint: 'Think about what curvature tells you vs. what it does not: it says how much the curve turns, but not in which direction.',
                    solution: 'Curvature \\(\\kappa\\) tells us the magnitude of turning but not the direction. Two curves with the same curvature function can look completely different in 3D if they twist differently. The Frenet frame provides an orthonormal basis \\(\\{\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\}\\) at each point that tracks both the direction of turning (via \\(\\mathbf{N}\\)) and the orientation of the osculating plane (via \\(\\mathbf{B}\\)). Combined with torsion \\(\\tau\\), the frame captures all local geometry.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: The TNB Frame
        // ================================================================
        {
            id: 'sec-frame',
            title: 'The TNB Frame',
            content: `
<h2>The TNB Frame</h2>

<p>Let \\(\\alpha: I \\to \\mathbb{R}^3\\) be a unit-speed curve with \\(\\kappa(s) > 0\\). We define three mutually orthogonal unit vectors at each point:</p>

<div class="env-block definition">
    <div class="env-title">Definition 2.1 (Frenet-Serret Frame)</div>
    <div class="env-body">
        <p>The <strong>Frenet-Serret frame</strong> (or <strong>TNB frame</strong>) at \\(\\alpha(s)\\) consists of:</p>
        <ol>
            <li>The <strong>unit tangent vector</strong>: \\(\\mathbf{T}(s) = \\alpha'(s)\\)</li>
            <li>The <strong>principal normal vector</strong>: \\(\\mathbf{N}(s) = \\dfrac{\\alpha''(s)}{\\|\\alpha''(s)\\|} = \\dfrac{\\mathbf{T}'(s)}{\\kappa(s)}\\)</li>
            <li>The <strong>binormal vector</strong>: \\(\\mathbf{B}(s) = \\mathbf{T}(s) \\times \\mathbf{N}(s)\\)</li>
        </ol>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Proposition 2.2 (Orthonormality)</div>
    <div class="env-body">
        <p>At each point where \\(\\kappa > 0\\), the vectors \\(\\{\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\}\\) form a positively oriented orthonormal basis for \\(\\mathbb{R}^3\\). That is:</p>
        \\[
        \\mathbf{T} \\cdot \\mathbf{T} = \\mathbf{N} \\cdot \\mathbf{N} = \\mathbf{B} \\cdot \\mathbf{B} = 1, \\quad \\mathbf{T} \\cdot \\mathbf{N} = \\mathbf{T} \\cdot \\mathbf{B} = \\mathbf{N} \\cdot \\mathbf{B} = 0.
        \\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Since \\(\\alpha\\) has unit speed, \\(\\|\\mathbf{T}\\| = \\|\\alpha'\\| = 1\\). Differentiating \\(\\mathbf{T} \\cdot \\mathbf{T} = 1\\) gives \\(2\\mathbf{T}' \\cdot \\mathbf{T} = 0\\), so \\(\\mathbf{T}' \\perp \\mathbf{T}\\). Since \\(\\mathbf{N} = \\mathbf{T}'/\\kappa\\), we have \\(\\mathbf{T} \\perp \\mathbf{N}\\) and \\(\\|\\mathbf{N}\\| = 1\\). The binormal \\(\\mathbf{B} = \\mathbf{T} \\times \\mathbf{N}\\) is automatically unit length and perpendicular to both \\(\\mathbf{T}\\) and \\(\\mathbf{N}\\) (properties of the cross product of orthonormal vectors). The frame is right-handed by construction.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Geometric Meaning</h3>

<p>Each vector in the TNB frame has a clear geometric role:</p>

<ul>
    <li><strong>\\(\\mathbf{T}\\)</strong> points in the instantaneous direction of motion. If you are driving, it points along the road ahead.</li>
    <li><strong>\\(\\mathbf{N}\\)</strong> points toward the center of curvature, the direction in which the curve is turning. It always points "inward" toward the osculating circle.</li>
    <li><strong>\\(\\mathbf{B}\\)</strong> is perpendicular to the <em>osculating plane</em> (the plane spanned by \\(\\mathbf{T}\\) and \\(\\mathbf{N}\\)). It measures the "tilt" of that plane as you move along the curve.</li>
</ul>

<div class="env-block definition">
    <div class="env-title">Definition 2.3 (Osculating Plane)</div>
    <div class="env-body">
        <p>The <strong>osculating plane</strong> at \\(\\alpha(s)\\) is the plane through \\(\\alpha(s)\\) spanned by \\(\\mathbf{T}(s)\\) and \\(\\mathbf{N}(s)\\). Equivalently, it is the plane with normal \\(\\mathbf{B}(s)\\). This is the plane that best approximates the curve near \\(s\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">For General-Speed Curves</div>
    <div class="env-body">
        <p>If \\(\\alpha(t)\\) is not unit-speed but regular (\\(\\alpha'(t) \\neq 0\\)), we have:</p>
        \\[
        \\mathbf{T} = \\frac{\\alpha'}{\\|\\alpha'\\|}, \\quad
        \\mathbf{B} = \\frac{\\alpha' \\times \\alpha''}{\\|\\alpha' \\times \\alpha''\\|}, \\quad
        \\mathbf{N} = \\mathbf{B} \\times \\mathbf{T}.
        \\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-frenet-helix"></div>
<div class="viz-placeholder" data-viz="viz-frenet-plane-curve"></div>
`,
            visualizations: [
                // === VIZ 2: TNB on a helix ===
                {
                    id: 'viz-frenet-helix',
                    title: 'TNB Frame on a Helix',
                    description: 'The helix has constant curvature and constant torsion. Watch how the TNB frame rotates uniformly as it moves along the helix. T spirals forward, N always points toward the helix axis, and B tilts at a constant angle.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 220, scale: 50
                        });

                        var a = 1.5; // radius
                        var b = 0.5; // pitch
                        var t0 = 0;
                        var animating = true;

                        VizEngine.createSlider(controls, 'Radius a', 0.5, 2.5, a, 0.1, function(v) { a = v; });
                        VizEngine.createSlider(controls, 'Pitch b', 0.1, 1.5, b, 0.1, function(v) { b = v; });
                        VizEngine.createButton(controls, 'Pause / Play', function() { animating = !animating; });

                        var ca = Math.cos(0.6), sa = Math.sin(0.6);
                        function proj(x, y, z) { return [x + 0.35*z*ca, y + 0.35*z*sa]; }

                        function norm3(v) { return Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]); }
                        function scale3(v, s) { return [v[0]*s, v[1]*s, v[2]*s]; }
                        function add3(u, v) { return [u[0]+v[0], u[1]+v[1], u[2]+v[2]]; }
                        function cross3(u, v) { return [u[1]*v[2]-u[2]*v[1], u[2]*v[0]-u[0]*v[2], u[0]*v[1]-u[1]*v[0]]; }

                        function helix(tt) { return [a*Math.cos(tt), a*Math.sin(tt), b*tt]; }
                        function helixD(tt) { return [-a*Math.sin(tt), a*Math.cos(tt), b]; }
                        function helixDD(tt) { return [-a*Math.cos(tt), -a*Math.sin(tt), 0]; }

                        function drawArr(ctx, o, d, len, color, label) {
                            var tip = add3(o, scale3(d, len));
                            var p0 = proj(o[0], o[1], o[2]);
                            var p1 = proj(tip[0], tip[1], tip[2]);
                            var sx0 = viz.originX + p0[0]*viz.scale, sy0 = viz.originY - p0[1]*viz.scale;
                            var sx1 = viz.originX + p1[0]*viz.scale, sy1 = viz.originY - p1[1]*viz.scale;
                            var dx = sx1-sx0, dy = sy1-sy0, l = Math.sqrt(dx*dx+dy*dy);
                            if (l < 2) return;
                            var ang = Math.atan2(dy, dx);
                            ctx.strokeStyle = color; ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(sx0, sy0); ctx.lineTo(sx1, sy1); ctx.stroke();
                            ctx.fillStyle = color; ctx.beginPath();
                            ctx.moveTo(sx1, sy1);
                            ctx.lineTo(sx1 - 9*Math.cos(ang-0.35), sy1 - 9*Math.sin(ang-0.35));
                            ctx.lineTo(sx1 - 9*Math.cos(ang+0.35), sy1 - 9*Math.sin(ang+0.35));
                            ctx.closePath(); ctx.fill();
                            if (label) {
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText(label, sx1 + 10*Math.cos(ang), sy1 + 10*Math.sin(ang));
                            }
                        }

                        viz.animate(function() {
                            if (animating) t0 += 0.015;
                            viz.clear();
                            var ctx = viz.ctx;

                            // Curvature and torsion readouts
                            var kappa = a / (a*a + b*b);
                            var tau = b / (a*a + b*b);
                            viz.screenText('Helix: \u03B1(t) = (a cos t, a sin t, bt)', viz.width/2, 16, viz.colors.white, 13);
                            viz.screenText('\u03BA = ' + kappa.toFixed(3) + '   \u03C4 = ' + tau.toFixed(3) + '   (both constant)', viz.width/2, 36, viz.colors.teal, 11);

                            // Draw helix
                            ctx.strokeStyle = viz.colors.white + '44'; ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 300; i++) {
                                var tt = -2*Math.PI + (i/300)*6*Math.PI;
                                var pt = helix(tt);
                                var pp = proj(pt[0], pt[1], pt[2]);
                                var sx = viz.originX + pp[0]*viz.scale, sy = viz.originY - pp[1]*viz.scale;
                                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Frame at current point
                            var tCur = t0 % (6*Math.PI);
                            var pos = helix(tCur);
                            var dr = helixD(tCur);
                            var ddr = helixDD(tCur);
                            var ndr = norm3(dr);
                            var T = scale3(dr, 1/ndr);
                            var B_raw = cross3(dr, ddr);
                            var nB = norm3(B_raw);
                            var B = nB > 1e-10 ? scale3(B_raw, 1/nB) : [0,0,1];
                            var N = cross3(B, T);

                            drawArr(ctx, pos, T, 1.0, viz.colors.red, 'T');
                            drawArr(ctx, pos, N, 1.0, viz.colors.green, 'N');
                            drawArr(ctx, pos, B, 1.0, viz.colors.blue, 'B');

                            // Draw axis line
                            ctx.strokeStyle = viz.colors.purple + '33'; ctx.lineWidth = 1;
                            ctx.setLineDash([4,4]);
                            var ax0 = proj(0, 0, -8), ax1 = proj(0, 0, 12);
                            ctx.beginPath();
                            ctx.moveTo(viz.originX + ax0[0]*viz.scale, viz.originY - ax0[1]*viz.scale);
                            ctx.lineTo(viz.originX + ax1[0]*viz.scale, viz.originY - ax1[1]*viz.scale);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Point
                            var pp2 = proj(pos[0], pos[1], pos[2]);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath(); ctx.arc(viz.originX + pp2[0]*viz.scale, viz.originY - pp2[1]*viz.scale, 4, 0, Math.PI*2); ctx.fill();

                            viz.screenText('N always points toward the helix axis', viz.width/2, viz.height - 16, viz.colors.text, 11);
                        });
                        return viz;
                    }
                },
                // === VIZ 3: TNB on a plane curve ===
                {
                    id: 'viz-frenet-plane-curve',
                    title: 'TNB Frame on a Plane Curve',
                    description: 'For a plane curve, torsion is identically zero and the binormal B is constant (always perpendicular to the plane). Only T and N rotate.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 200, scale: 55
                        });

                        var t0 = 0;
                        var animating = true;

                        VizEngine.createButton(controls, 'Pause / Play', function() { animating = !animating; });

                        // Plane curve: cardioid-like
                        function curve(tt) {
                            var r = 1.5 + 1.0*Math.cos(tt);
                            return [r * Math.cos(tt), r * Math.sin(tt)];
                        }

                        function curveD(tt) {
                            var h = 0.0001;
                            var c1 = curve(tt - h), c2 = curve(tt + h);
                            return [(c2[0]-c1[0])/(2*h), (c2[1]-c1[1])/(2*h)];
                        }

                        function curveDD(tt) {
                            var h = 0.0001;
                            var c0 = curve(tt-h), c1 = curve(tt), c2 = curve(tt+h);
                            return [(c2[0]-2*c1[0]+c0[0])/(h*h), (c2[1]-2*c1[1]+c0[1])/(h*h)];
                        }

                        viz.animate(function() {
                            if (animating) t0 += 0.012;
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Plane Curve: \u03C4 = 0, B = constant', viz.width/2, 16, viz.colors.white, 14);

                            // Draw grid and curve
                            viz.drawGrid(1);
                            viz.drawAxes();

                            ctx.strokeStyle = viz.colors.white + '55'; ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 300; i++) {
                                var tt = (i/300)*2*Math.PI;
                                var pt = curve(tt);
                                var sc = viz.toScreen(pt[0], pt[1]);
                                if (i === 0) ctx.moveTo(sc[0], sc[1]); else ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.stroke();

                            // TNB at current point
                            var tCur = t0 % (2*Math.PI);
                            var pos = curve(tCur);
                            var dr = curveD(tCur);
                            var ndr = Math.sqrt(dr[0]*dr[0]+dr[1]*dr[1]);
                            if (ndr < 1e-10) return;
                            var T = [dr[0]/ndr, dr[1]/ndr];
                            // N is 90 deg rotation toward curvature center
                            var ddr = curveDD(tCur);
                            // signed curvature: (x'y'' - y'x'') / |r'|^3
                            var signedK = (dr[0]*ddr[1] - dr[1]*ddr[0]) / (ndr*ndr*ndr);
                            var N;
                            if (Math.abs(signedK) > 1e-10) {
                                N = signedK > 0 ? [-T[1], T[0]] : [T[1], -T[0]];
                            } else {
                                N = [-T[1], T[0]];
                            }

                            var arrLen = 0.8;
                            // T arrow
                            viz.drawVector(pos[0], pos[1], pos[0] + T[0]*arrLen, pos[1] + T[1]*arrLen, viz.colors.red, 'T', 2.5);
                            // N arrow
                            viz.drawVector(pos[0], pos[1], pos[0] + N[0]*arrLen, pos[1] + N[1]*arrLen, viz.colors.green, 'N', 2.5);

                            // Point
                            viz.drawPoint(pos[0], pos[1], viz.colors.yellow, null, 5);

                            // B indicator (pointing "out of screen")
                            var sp = viz.toScreen(pos[0], pos[1]);
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(sp[0], sp[1] - 30, 8, 0, Math.PI*2); ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(sp[0], sp[1] - 30, 3, 0, Math.PI*2); ctx.fill();
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.fillText('B (out of plane)', sp[0]+14, sp[1]-28);

                            viz.screenText('\u03BA = ' + Math.abs(signedK).toFixed(3) + '     \u03C4 = 0', viz.width/2, viz.height - 16, viz.colors.teal, 12);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the Frenet frame \\(\\{\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\}\\) for the helix \\(\\alpha(t) = (a\\cos t, a\\sin t, bt)\\) where \\(a > 0\\).',
                    hint: 'Compute \\(\\alpha\'\\), normalize to get \\(\\mathbf{T}\\). Then compute \\(\\alpha\'\'\\) and use \\(\\mathbf{N} = \\mathbf{T}\'/\\kappa\\). Finally \\(\\mathbf{B} = \\mathbf{T} \\times \\mathbf{N}\\).',
                    solution: '\\(\\alpha\'(t) = (-a\\sin t, a\\cos t, b)\\), so \\(\\|\\alpha\'\\| = \\sqrt{a^2 + b^2}\\). Let \\(c = \\sqrt{a^2+b^2}\\). Then \\(\\mathbf{T} = \\frac{1}{c}(-a\\sin t, a\\cos t, b)\\), \\(\\alpha\'\'(t) = (-a\\cos t, -a\\sin t, 0)\\). Computing \\(\\mathbf{T}\' = \\alpha\'\'/c\\) and \\(\\kappa = a/c^2\\), we get \\(\\mathbf{N} = (-\\cos t, -\\sin t, 0)\\). Then \\(\\mathbf{B} = \\mathbf{T} \\times \\mathbf{N} = \\frac{1}{c}(b\\sin t, -b\\cos t, a)\\).'
                },
                {
                    question: 'Show that \\(\\mathbf{T}\' \\perp \\mathbf{T}\\) for any unit-speed curve. Why is this crucial for defining \\(\\mathbf{N}\\)?',
                    hint: 'Differentiate \\(\\mathbf{T} \\cdot \\mathbf{T} = 1\\).',
                    solution: 'Since \\(\\|\\mathbf{T}\\|^2 = \\mathbf{T} \\cdot \\mathbf{T} = 1\\) is constant, differentiating gives \\(2\\mathbf{T}\' \\cdot \\mathbf{T} = 0\\), so \\(\\mathbf{T}\' \\perp \\mathbf{T}\\). This is crucial because it guarantees \\(\\mathbf{N} = \\mathbf{T}\'/\\|\\mathbf{T}\'\\|\\) is automatically perpendicular to \\(\\mathbf{T}\\), giving us the second leg of an orthonormal frame without any Gram-Schmidt process.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Frenet-Serret Equations
        // ================================================================
        {
            id: 'sec-equations',
            title: 'Frenet-Serret Equations',
            content: `
<h2>The Frenet-Serret Equations</h2>

<p>The power of the TNB frame lies in the fact that its rate of change is governed by a remarkably simple system of ODEs. Since \\(\\{\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\}\\) is an orthonormal basis at each point, the derivatives \\(\\mathbf{T}', \\mathbf{N}', \\mathbf{B}'\\) can be expressed as linear combinations of \\(\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\) themselves.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.4 (Frenet-Serret Equations)</div>
    <div class="env-body">
        <p>Let \\(\\alpha(s)\\) be a unit-speed curve with \\(\\kappa(s) > 0\\). Then:</p>
        \\[
        \\begin{pmatrix} \\mathbf{T}' \\\\ \\mathbf{N}' \\\\ \\mathbf{B}' \\end{pmatrix}
        =
        \\begin{pmatrix} 0 & \\kappa & 0 \\\\ -\\kappa & 0 & \\tau \\\\ 0 & -\\tau & 0 \\end{pmatrix}
        \\begin{pmatrix} \\mathbf{T} \\\\ \\mathbf{N} \\\\ \\mathbf{B} \\end{pmatrix}
        \\]
        <p>That is:</p>
        \\[
        \\mathbf{T}' = \\kappa \\mathbf{N}, \\qquad
        \\mathbf{N}' = -\\kappa \\mathbf{T} + \\tau \\mathbf{B}, \\qquad
        \\mathbf{B}' = -\\tau \\mathbf{N}.
        \\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p><strong>First equation:</strong> By definition, \\(\\mathbf{T}' = \\kappa \\mathbf{N}\\). This is just the definition of \\(\\mathbf{N}\\) and \\(\\kappa\\).</p>

        <p><strong>Third equation:</strong> Differentiate \\(\\mathbf{B} = \\mathbf{T} \\times \\mathbf{N}\\):</p>
        \\[
        \\mathbf{B}' = \\mathbf{T}' \\times \\mathbf{N} + \\mathbf{T} \\times \\mathbf{N}' = \\kappa \\mathbf{N} \\times \\mathbf{N} + \\mathbf{T} \\times \\mathbf{N}'.
        \\]
        <p>Since \\(\\mathbf{N} \\times \\mathbf{N} = \\mathbf{0}\\), we get \\(\\mathbf{B}' = \\mathbf{T} \\times \\mathbf{N}'\\). Now \\(\\mathbf{B}' \\perp \\mathbf{B}\\) (differentiate \\(\\mathbf{B} \\cdot \\mathbf{B} = 1\\)), and \\(\\mathbf{B}' \\perp \\mathbf{T}\\) (differentiate \\(\\mathbf{B} \\cdot \\mathbf{T} = 0\\) to get \\(\\mathbf{B}' \\cdot \\mathbf{T} + \\mathbf{B} \\cdot \\mathbf{T}' = \\mathbf{B}' \\cdot \\mathbf{T} + \\kappa \\mathbf{B} \\cdot \\mathbf{N} = \\mathbf{B}' \\cdot \\mathbf{T}\\)). So \\(\\mathbf{B}' = -\\tau \\mathbf{N}\\) for some scalar \\(\\tau\\), which defines the torsion.</p>

        <p><strong>Second equation:</strong> Since \\(\\{\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\}\\) is orthonormal, write \\(\\mathbf{N}' = a\\mathbf{T} + b\\mathbf{N} + c\\mathbf{B}\\). Then:</p>
        <ul>
            <li>\\(a = \\mathbf{N}' \\cdot \\mathbf{T} = -(\\mathbf{N} \\cdot \\mathbf{T}') = -\\kappa\\) (differentiate \\(\\mathbf{N} \\cdot \\mathbf{T} = 0\\))</li>
            <li>\\(b = \\mathbf{N}' \\cdot \\mathbf{N} = 0\\) (differentiate \\(\\mathbf{N} \\cdot \\mathbf{N} = 1\\))</li>
            <li>\\(c = \\mathbf{N}' \\cdot \\mathbf{B} = -(\\mathbf{N} \\cdot \\mathbf{B}') = \\tau\\) (differentiate \\(\\mathbf{N} \\cdot \\mathbf{B} = 0\\))</li>
        </ul>
        <p>Hence \\(\\mathbf{N}' = -\\kappa\\mathbf{T} + \\tau\\mathbf{B}\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block remark">
    <div class="env-title">The Skew-Symmetric Structure</div>
    <div class="env-body">
        <p>The matrix in the Frenet-Serret equations is <strong>skew-symmetric</strong> (antisymmetric): \\(\\Omega^T = -\\Omega\\). This is not a coincidence. The frame \\(\\{\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\}\\) lies in \\(\\mathrm{SO}(3)\\) (the rotation group), and the derivative of any path in \\(\\mathrm{SO}(3)\\) lives in its Lie algebra \\(\\mathfrak{so}(3)\\), which consists precisely of skew-symmetric matrices. The two independent entries \\(\\kappa\\) and \\(\\tau\\) correspond to the two "angular velocities" of the frame: bending (\\(\\kappa\\)) and twisting (\\(\\tau\\)).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-frenet-equations"></div>
`,
            visualizations: [
                // === VIZ 4: Matrix display updating as point moves ===
                {
                    id: 'viz-frenet-equations',
                    title: 'Frenet-Serret Equations in Action',
                    description: 'Watch the Frenet-Serret matrix update in real time as a point moves along a curve. The entries show how T\', N\', B\' decompose into T, N, B components.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 440,
                            originX: 160, originY: 260, scale: 50
                        });

                        var t0 = 0;
                        var animating = true;
                        VizEngine.createButton(controls, 'Pause / Play', function() { animating = !animating; });

                        // Curve: a more interesting curve with varying kappa and tau
                        function curve(tt) {
                            return [
                                (2 + 0.5*Math.cos(3*tt)) * Math.cos(2*tt),
                                (2 + 0.5*Math.cos(3*tt)) * Math.sin(2*tt),
                                0.8 * Math.sin(3*tt)
                            ];
                        }

                        function numDeriv(f, tt, h) {
                            var c1 = f(tt-h), c2 = f(tt+h);
                            return [(c2[0]-c1[0])/(2*h), (c2[1]-c1[1])/(2*h), (c2[2]-c1[2])/(2*h)];
                        }

                        function numDeriv2(f, tt, h) {
                            var c0 = f(tt-h), c1 = f(tt), c2 = f(tt+h);
                            return [(c2[0]-2*c1[0]+c0[0])/(h*h), (c2[1]-2*c1[1]+c0[1])/(h*h), (c2[2]-2*c1[2]+c0[2])/(h*h)];
                        }

                        function norm3(v) { return Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]); }
                        function scale3(v, s) { return [v[0]*s, v[1]*s, v[2]*s]; }
                        function cross3(a, b) { return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]; }
                        function dot3(a, b) { return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]; }

                        function getFrameAndCurvatures(tt) {
                            var dr = numDeriv(curve, tt, 0.0001);
                            var ddr = numDeriv2(curve, tt, 0.0001);
                            var ndr = norm3(dr);
                            if (ndr < 1e-10) return null;
                            var T = scale3(dr, 1/ndr);
                            var B_raw = cross3(dr, ddr);
                            var nB = norm3(B_raw);
                            if (nB < 1e-10) return null;
                            var B = scale3(B_raw, 1/nB);
                            var N = cross3(B, T);

                            var kappa = nB / (ndr*ndr*ndr);

                            // Torsion: tau = (r' x r'') . r''' / |r' x r''|^2
                            var h = 0.0001;
                            var dddr = numDeriv(function(t) { return numDeriv2(curve, t, h); }, tt, h);
                            var tau = dot3(B_raw, dddr) / (nB * nB);

                            return { T: T, N: N, B: B, kappa: kappa, tau: tau };
                        }

                        var angle = 0.6;
                        var cA = Math.cos(angle), sA = Math.sin(angle);
                        function proj(x, y, z) { return [x + 0.35*z*cA, y + 0.35*z*sA]; }

                        viz.animate(function() {
                            if (animating) t0 += 0.008;
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw curve (small, on the left)
                            ctx.strokeStyle = viz.colors.white + '44'; ctx.lineWidth = 1.2;
                            ctx.beginPath();
                            for (var i = 0; i <= 300; i++) {
                                var tt = (i/300)*2*Math.PI;
                                var pt = curve(tt);
                                var pp = proj(pt[0], pt[1], pt[2]);
                                var sx = viz.originX + pp[0]*viz.scale*0.5;
                                var sy = viz.originY - pp[1]*viz.scale*0.5;
                                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            var tCur = t0 % (2*Math.PI);
                            var f = getFrameAndCurvatures(tCur);
                            if (!f) return;

                            // Draw point on curve
                            var pos = curve(tCur);
                            var pp = proj(pos[0], pos[1], pos[2]);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.arc(viz.originX + pp[0]*viz.scale*0.5, viz.originY - pp[1]*viz.scale*0.5, 4, 0, Math.PI*2);
                            ctx.fill();

                            // Matrix display on the right
                            var mx = 320, my = 50;
                            viz.screenText('Frenet-Serret Equations', mx + 90, my, viz.colors.white, 15);

                            my += 35;
                            var k = f.kappa, tau = f.tau;

                            // Draw the system of equations with live values
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';

                            // T' = kappa * N
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText("T'  =", mx, my);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText(k.toFixed(2), mx + 50, my);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText(' N', mx + 85, my);

                            my += 30;
                            // N' = -kappa * T + tau * B
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText("N'  =", mx, my);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText((-k).toFixed(2), mx + 50, my);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText(' T', mx + 96, my);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText(' + ', mx + 110, my);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText(tau.toFixed(2), mx + 132, my);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText(' B', mx + 168, my);

                            my += 30;
                            // B' = -tau * N
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText("B'  =", mx, my);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText((-tau).toFixed(2), mx + 50, my);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText(' N', mx + 96, my);

                            // Matrix form
                            my += 50;
                            viz.screenText('Matrix form (skew-symmetric):', mx + 90, my, viz.colors.text, 12);
                            my += 30;

                            // Draw matrix brackets and entries
                            var matX = mx + 20, matY = my;
                            var cellW = 55, cellH = 24;

                            // Bracket
                            ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(matX - 5, matY - 5);
                            ctx.lineTo(matX - 12, matY - 5);
                            ctx.lineTo(matX - 12, matY + 3*cellH + 5);
                            ctx.lineTo(matX - 5, matY + 3*cellH + 5);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(matX + 3*cellW + 5, matY - 5);
                            ctx.lineTo(matX + 3*cellW + 12, matY - 5);
                            ctx.lineTo(matX + 3*cellW + 12, matY + 3*cellH + 5);
                            ctx.lineTo(matX + 3*cellW + 5, matY + 3*cellH + 5);
                            ctx.stroke();

                            // Matrix entries
                            var matEntries = [
                                ['0', k.toFixed(2), '0'],
                                [(-k).toFixed(2), '0', tau.toFixed(2)],
                                ['0', (-tau).toFixed(2), '0']
                            ];
                            var matColors = [
                                [viz.colors.text, viz.colors.teal, viz.colors.text],
                                [viz.colors.teal, viz.colors.text, viz.colors.orange],
                                [viz.colors.text, viz.colors.orange, viz.colors.text]
                            ];
                            for (var r = 0; r < 3; r++) {
                                for (var c = 0; c < 3; c++) {
                                    ctx.fillStyle = matColors[r][c];
                                    ctx.font = '13px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText(matEntries[r][c], matX + c*cellW + cellW/2, matY + r*cellH + cellH/2);
                                }
                            }

                            // Curvature / torsion readout
                            viz.screenText('\u03BA = ' + k.toFixed(3), mx + 40, my + 3*cellH + 30, viz.colors.teal, 13);
                            viz.screenText('\u03C4 = ' + tau.toFixed(3), mx + 140, my + 3*cellH + 30, viz.colors.orange, 13);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that the Frenet-Serret matrix is skew-symmetric (\\(\\Omega^T = -\\Omega\\)). Why does this follow from the fact that the frame is orthonormal?',
                    hint: 'If \\(R(s)\\) is an orthogonal matrix (\\(R^T R = I\\)), differentiate both sides.',
                    solution: 'Let \\(R(s)\\) be the matrix whose rows are \\(\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\). Then \\(R^T R = I\\). Differentiating: \\(R\'^T R + R^T R\' = 0\\), so \\(R^T R\' = -(R^T R\')^T\\), i.e., \\(\\Omega = R^T R\'\\) is skew-symmetric. A \\(3 \\times 3\\) skew-symmetric matrix has only 3 independent entries; orthonormality further constrains them to just 2 (\\(\\kappa\\) and \\(\\tau\\)), since \\(\\mathbf{T}\' \\cdot \\mathbf{B} = 0\\).'
                },
                {
                    question: 'Show that \\(\\tau = -\\mathbf{B}\' \\cdot \\mathbf{N}\\). Use this to derive a formula for torsion in terms of \\(\\alpha\', \\alpha\'\', \\alpha\'\'\'\\).',
                    hint: 'From \\(\\mathbf{B}\' = -\\tau\\mathbf{N}\\), dot both sides with \\(\\mathbf{N}\\). For the formula, use \\(\\mathbf{B} = \\frac{\\alpha\' \\times \\alpha\'\'}{\\|\\alpha\' \\times \\alpha\'\'\\|}\\) and differentiate.',
                    solution: 'From \\(\\mathbf{B}\' = -\\tau\\mathbf{N}\\), dotting with \\(\\mathbf{N}\\): \\(\\mathbf{B}\' \\cdot \\mathbf{N} = -\\tau\\). For the explicit formula (general speed): \\(\\tau = \\frac{(\\alpha\' \\times \\alpha\'\') \\cdot \\alpha\'\'\'}{\\|\\alpha\' \\times \\alpha\'\'\\|^2}\\). This uses the product rule on \\(\\mathbf{B}\\) and the identities from the Frenet equations.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Fundamental Theorem of Curves
        // ================================================================
        {
            id: 'sec-fundamental-theorem',
            title: 'Fundamental Theorem of Curves',
            content: `
<h2>The Fundamental Theorem of Space Curves</h2>

<div class="env-block intuition">
    <div class="env-title">DNA of a Curve</div>
    <div class="env-body">
        <p>Think of \\(\\kappa(s)\\) and \\(\\tau(s)\\) as the "DNA" of a curve. Just as your DNA determines your biological form (up to where you happen to stand), the curvature and torsion functions determine the curve's shape up to its position and orientation in space. Two curves with the same \\(\\kappa(s)\\) and \\(\\tau(s)\\) are identical up to a rigid motion.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.5 (Fundamental Theorem of Space Curves)</div>
    <div class="env-body">
        <p>Let \\(\\kappa: I \\to \\mathbb{R}^+\\) and \\(\\tau: I \\to \\mathbb{R}\\) be smooth functions defined on an interval \\(I\\). Then:</p>
        <ol>
            <li><strong>Existence:</strong> There exists a unit-speed curve \\(\\alpha: I \\to \\mathbb{R}^3\\) whose curvature is \\(\\kappa(s)\\) and whose torsion is \\(\\tau(s)\\).</li>
            <li><strong>Uniqueness:</strong> If \\(\\beta: I \\to \\mathbb{R}^3\\) is another unit-speed curve with the same \\(\\kappa\\) and \\(\\tau\\), then \\(\\beta\\) differs from \\(\\alpha\\) by a rigid motion (rotation + translation). That is, there exist \\(R \\in \\mathrm{SO}(3)\\) and \\(\\mathbf{c} \\in \\mathbb{R}^3\\) such that \\(\\beta(s) = R\\alpha(s) + \\mathbf{c}\\) for all \\(s\\).</li>
        </ol>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p><strong>Existence:</strong> Choose initial conditions \\(\\mathbf{T}(s_0), \\mathbf{N}(s_0), \\mathbf{B}(s_0)\\) forming a positively oriented orthonormal frame and a starting point \\(\\alpha(s_0)\\). Solve the Frenet-Serret ODE system:</p>
        \\[
        \\frac{d}{ds}\\begin{pmatrix} \\mathbf{T} \\\\ \\mathbf{N} \\\\ \\mathbf{B} \\end{pmatrix}
        = \\begin{pmatrix} 0 & \\kappa & 0 \\\\ -\\kappa & 0 & \\tau \\\\ 0 & -\\tau & 0 \\end{pmatrix}
        \\begin{pmatrix} \\mathbf{T} \\\\ \\mathbf{N} \\\\ \\mathbf{B} \\end{pmatrix}
        \\]
        <p>By the Picard-Lindelof theorem, this has a unique solution. The skew-symmetry of the coefficient matrix guarantees the solution remains orthonormal. Then set \\(\\alpha(s) = \\alpha(s_0) + \\int_{s_0}^s \\mathbf{T}(u)\\,du\\).</p>

        <p><strong>Uniqueness:</strong> If \\(\\alpha\\) and \\(\\beta\\) have the same \\(\\kappa\\) and \\(\\tau\\), their Frenet frames satisfy the same ODE. By rigidity of orthonormal frames, the two frames are related by a constant rotation \\(R\\). Integrating \\(\\mathbf{T}\\) to get position introduces a constant translation \\(\\mathbf{c}\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>The Reconstruction Algorithm</h3>

<p>The proof is constructive: given \\(\\kappa(s)\\) and \\(\\tau(s)\\), we can numerically reconstruct the curve by:</p>
<ol>
    <li>Choosing initial frame \\(\\{\\mathbf{T}_0, \\mathbf{N}_0, \\mathbf{B}_0\\}\\) and initial point \\(\\mathbf{p}_0\\).</li>
    <li>Integrating the Frenet-Serret equations (e.g., by Runge-Kutta) to obtain \\(\\mathbf{T}(s)\\).</li>
    <li>Integrating \\(\\alpha(s) = \\mathbf{p}_0 + \\int_0^s \\mathbf{T}(u)\\,du\\).</li>
</ol>

<div class="viz-placeholder" data-viz="viz-reconstruct-curve"></div>
`,
            visualizations: [
                // === VIZ 5: Reconstruct curve from kappa(s), tau(s) ===
                {
                    id: 'viz-reconstruct-curve',
                    title: 'Curve Reconstruction from Curvature and Torsion',
                    description: 'Given curvature kappa(s) and torsion tau(s), watch the curve being reconstructed by integrating the Frenet-Serret equations step by step. The frame evolves and traces out the curve.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 230, scale: 80
                        });

                        var kappaVal = 1.0;
                        var tauVal = 0.3;
                        var progress = 0;
                        var animating = true;

                        VizEngine.createSlider(controls, '\u03BA(s)', 0.2, 3.0, kappaVal, 0.1, function(v) { kappaVal = v; progress = 0; });
                        VizEngine.createSlider(controls, '\u03C4(s)', -1.0, 1.0, tauVal, 0.1, function(v) { tauVal = v; progress = 0; });
                        VizEngine.createButton(controls, 'Restart', function() { progress = 0; animating = true; });
                        VizEngine.createButton(controls, 'Pause / Play', function() { animating = !animating; });

                        var ca = Math.cos(0.65), sa = Math.sin(0.65);
                        function proj(x, y, z) { return [x + 0.35*z*ca, y + 0.35*z*sa]; }

                        function norm3(v) { return Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]); }
                        function scale3(v, s) { return [v[0]*s, v[1]*s, v[2]*s]; }
                        function add3(a, b) { return [a[0]+b[0], a[1]+b[1], a[2]+b[2]]; }

                        function reconstructCurve(kappa, tau, sMax, ds) {
                            var T = [1,0,0], N = [0,1,0], B = [0,0,1];
                            var pos = [0,0,0];
                            var points = [pos.slice()];
                            var frames = [{pos: pos.slice(), T: T.slice(), N: N.slice(), B: B.slice()}];

                            for (var s = 0; s < sMax; s += ds) {
                                var k = kappa, t = tau;
                                // Euler integration of Frenet-Serret
                                var dT = [k*N[0]*ds, k*N[1]*ds, k*N[2]*ds];
                                var dN = [(-k*T[0]+t*B[0])*ds, (-k*T[1]+t*B[1])*ds, (-k*T[2]+t*B[2])*ds];
                                var dB = [-t*N[0]*ds, -t*N[1]*ds, -t*N[2]*ds];

                                T = [T[0]+dT[0], T[1]+dT[1], T[2]+dT[2]];
                                N = [N[0]+dN[0], N[1]+dN[1], N[2]+dN[2]];
                                B = [B[0]+dB[0], B[1]+dB[1], B[2]+dB[2]];

                                // Re-orthonormalize (Gram-Schmidt)
                                var nT = norm3(T); T = scale3(T, 1/nT);
                                var d = T[0]*N[0]+T[1]*N[1]+T[2]*N[2];
                                N = [N[0]-d*T[0], N[1]-d*T[1], N[2]-d*T[2]];
                                var nN = norm3(N); N = scale3(N, 1/nN);
                                B = [T[1]*N[2]-T[2]*N[1], T[2]*N[0]-T[0]*N[2], T[0]*N[1]-T[1]*N[0]];

                                pos = add3(pos, scale3(T, ds));
                                points.push(pos.slice());
                                frames.push({pos: pos.slice(), T: T.slice(), N: N.slice(), B: B.slice()});
                            }
                            return { points: points, frames: frames };
                        }

                        viz.animate(function() {
                            if (animating && progress < 1) progress += 0.003;
                            if (progress > 1) progress = 1;
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Reconstructing curve from \u03BA = ' + kappaVal.toFixed(1) + ', \u03C4 = ' + tauVal.toFixed(1), viz.width/2, 16, viz.colors.white, 14);

                            var sMax = 12;
                            var ds = 0.02;
                            var data = reconstructCurve(kappaVal, tauVal, sMax, ds);
                            var totalPts = data.points.length;
                            var showN = Math.floor(progress * totalPts);

                            // Draw curve up to current point
                            ctx.strokeStyle = viz.colors.yellow; ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i <= showN && i < totalPts; i++) {
                                var pt = data.points[i];
                                var pp = proj(pt[0], pt[1], pt[2]);
                                var sx = viz.originX + pp[0]*viz.scale;
                                var sy = viz.originY - pp[1]*viz.scale;
                                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Also draw full ghost curve faintly
                            if (progress < 1) {
                                ctx.strokeStyle = viz.colors.white + '15'; ctx.lineWidth = 1;
                                ctx.beginPath();
                                for (var j = showN; j < totalPts; j++) {
                                    var pt2 = data.points[j];
                                    var pp2 = proj(pt2[0], pt2[1], pt2[2]);
                                    var sx2 = viz.originX + pp2[0]*viz.scale;
                                    var sy2 = viz.originY - pp2[1]*viz.scale;
                                    if (j === showN) ctx.moveTo(sx2, sy2); else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // Draw current frame
                            if (showN > 0 && showN < totalPts) {
                                var fr = data.frames[showN];
                                var po = fr.pos;
                                var arrLen = 0.4;

                                // Frame arrows
                                var drawArr = function(origin, dir, len, color, label) {
                                    var tip = add3(origin, scale3(dir, len));
                                    var p0 = proj(origin[0], origin[1], origin[2]);
                                    var p1 = proj(tip[0], tip[1], tip[2]);
                                    var sx0 = viz.originX + p0[0]*viz.scale, sy0 = viz.originY - p0[1]*viz.scale;
                                    var sx1 = viz.originX + p1[0]*viz.scale, sy1 = viz.originY - p1[1]*viz.scale;
                                    var ddx = sx1-sx0, ddy = sy1-sy0, ll = Math.sqrt(ddx*ddx+ddy*ddy);
                                    if (ll < 2) return;
                                    var ang = Math.atan2(ddy, ddx);
                                    ctx.strokeStyle = color; ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.moveTo(sx0, sy0); ctx.lineTo(sx1, sy1); ctx.stroke();
                                    ctx.fillStyle = color; ctx.beginPath();
                                    ctx.moveTo(sx1, sy1);
                                    ctx.lineTo(sx1 - 7*Math.cos(ang-0.35), sy1 - 7*Math.sin(ang-0.35));
                                    ctx.lineTo(sx1 - 7*Math.cos(ang+0.35), sy1 - 7*Math.sin(ang+0.35));
                                    ctx.closePath(); ctx.fill();
                                    if (label) {
                                        ctx.font = 'bold 11px -apple-system,sans-serif';
                                        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                        ctx.fillText(label, sx1 + 8*Math.cos(ang), sy1 + 8*Math.sin(ang));
                                    }
                                };

                                drawArr(po, fr.T, arrLen, viz.colors.red, 'T');
                                drawArr(po, fr.N, arrLen, viz.colors.green, 'N');
                                drawArr(po, fr.B, arrLen, viz.colors.blue, 'B');

                                var pp3 = proj(po[0], po[1], po[2]);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath();
                                ctx.arc(viz.originX + pp3[0]*viz.scale, viz.originY - pp3[1]*viz.scale, 4, 0, Math.PI*2);
                                ctx.fill();
                            }

                            // Progress bar
                            var barY = viz.height - 30;
                            ctx.fillStyle = viz.colors.grid;
                            ctx.fillRect(30, barY, viz.width - 60, 6);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillRect(30, barY, (viz.width - 60)*progress, 6);

                            viz.screenText('arc length: ' + (progress*sMax).toFixed(1) + ' / ' + sMax.toFixed(0), viz.width/2, barY + 18, viz.colors.text, 11);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'If \\(\\kappa(s) = 1\\) and \\(\\tau(s) = 0\\) for all \\(s\\), what curve does the Fundamental Theorem reconstruct?',
                    hint: 'Constant curvature and zero torsion means the curve lies in a plane and has constant curvature.',
                    solution: 'Constant \\(\\kappa = 1\\) and \\(\\tau = 0\\) gives a circle of radius \\(1/\\kappa = 1\\) lying in a plane. The zero torsion forces the curve to stay in its initial osculating plane, and constant curvature forces it to bend at a constant rate, tracing out a circle.'
                },
                {
                    question: 'Explain why the Fundamental Theorem guarantees uniqueness only "up to rigid motion." Give an example of two curves with the same \\(\\kappa\\) and \\(\\tau\\) that are not identical.',
                    hint: 'The initial conditions of the ODE (starting point and initial frame) determine the position and orientation.',
                    solution: 'The Frenet-Serret ODE determines the frame evolution given \\(\\kappa\\) and \\(\\tau\\), but the initial conditions (starting point \\(\\alpha(s_0)\\) and initial frame \\(\\{\\mathbf{T}_0, \\mathbf{N}_0, \\mathbf{B}_0\\}\\)) are free. Different initial conditions produce curves that differ by a rigid motion. Example: a unit circle centered at the origin and a unit circle centered at \\((5,0,0)\\) both have \\(\\kappa = 1, \\tau = 0\\), but they differ by a translation.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Special Curves
        // ================================================================
        {
            id: 'sec-special',
            title: 'Special Curves',
            content: `
<h2>Special Curves</h2>

<p>The Frenet-Serret equations immediately characterize several important families of curves via simple conditions on \\(\\kappa\\) and \\(\\tau\\).</p>

<h3>Plane Curves: \\(\\tau = 0\\)</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.6 (Characterization of Plane Curves)</div>
    <div class="env-body">
        <p>A curve \\(\\alpha\\) (with \\(\\kappa > 0\\)) lies entirely in a plane if and only if \\(\\tau(s) \\equiv 0\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>(\\(\\Rightarrow\\)) If \\(\\alpha\\) lies in a plane with unit normal \\(\\mathbf{n}\\), then \\(\\mathbf{B} = \\pm\\mathbf{n}\\) is constant, so \\(\\mathbf{B}' = 0 = -\\tau\\mathbf{N}\\), giving \\(\\tau = 0\\).</p>
        <p>(\\(\\Leftarrow\\)) If \\(\\tau = 0\\), then \\(\\mathbf{B}' = 0\\), so \\(\\mathbf{B}\\) is constant. Consider \\(f(s) = (\\alpha(s) - \\alpha(s_0)) \\cdot \\mathbf{B}\\). Then \\(f' = \\alpha' \\cdot \\mathbf{B} = \\mathbf{T} \\cdot \\mathbf{B} = 0\\), so \\(f\\) is constant with \\(f(s_0) = 0\\). Thus \\(\\alpha(s)\\) lies in the plane through \\(\\alpha(s_0)\\) with normal \\(\\mathbf{B}\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Helices: \\(\\kappa/\\tau = \\text{const}\\)</h3>

<div class="env-block definition">
    <div class="env-title">Definition 2.7 (Helix)</div>
    <div class="env-body">
        <p>A <strong>general helix</strong> (or <strong>cylindrical helix</strong>) is a curve whose tangent makes a constant angle with a fixed direction \\(\\mathbf{u}\\). That is, \\(\\mathbf{T}(s) \\cdot \\mathbf{u} = \\cos\\theta\\) for some constant \\(\\theta\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.8 (Lancret's Theorem)</div>
    <div class="env-body">
        <p>A curve \\(\\alpha\\) with \\(\\kappa > 0\\) is a general helix if and only if \\(\\tau/\\kappa\\) is constant.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>(\\(\\Rightarrow\\)) If \\(\\mathbf{T} \\cdot \\mathbf{u} = \\cos\\theta\\) is constant, differentiate: \\(\\mathbf{T}' \\cdot \\mathbf{u} = \\kappa(\\mathbf{N} \\cdot \\mathbf{u}) = 0\\), so \\(\\mathbf{N} \\perp \\mathbf{u}\\). Write \\(\\mathbf{u} = (\\cos\\theta)\\mathbf{T} + (\\sin\\theta)\\mathbf{B}\\) (since \\(\\mathbf{u}\\) has no \\(\\mathbf{N}\\) component). Differentiating: \\(0 = \\cos\\theta \\cdot \\kappa\\mathbf{N} + \\sin\\theta \\cdot (-\\tau)\\mathbf{N} = (\\kappa\\cos\\theta - \\tau\\sin\\theta)\\mathbf{N}\\). Since \\(\\mathbf{N} \\neq 0\\): \\(\\tau/\\kappa = \\cos\\theta/\\sin\\theta = \\cot\\theta = \\text{const}\\).</p>
        <p>(\\(\\Leftarrow\\)) If \\(\\tau/\\kappa = c\\), set \\(\\theta = \\operatorname{arccot}(c)\\) and define \\(\\mathbf{u} = \\cos\\theta\\,\\mathbf{T} + \\sin\\theta\\,\\mathbf{B}\\). Differentiating and using the Frenet equations shows \\(\\mathbf{u}' = 0\\), so \\(\\mathbf{u}\\) is constant and \\(\\mathbf{T} \\cdot \\mathbf{u} = \\cos\\theta\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Bertrand Curves</h3>

<div class="env-block definition">
    <div class="env-title">Definition 2.9 (Bertrand Curve)</div>
    <div class="env-body">
        <p>A <strong>Bertrand curve</strong> is a curve \\(\\alpha\\) for which there exists another curve \\(\\beta\\) (its <strong>Bertrand mate</strong>) such that \\(\\alpha\\) and \\(\\beta\\) share the same principal normal line at corresponding points: \\(\\beta(s) = \\alpha(s) + r\\mathbf{N}(s)\\) for some constant \\(r\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.10 (Characterization of Bertrand Curves)</div>
    <div class="env-body">
        <p>A curve \\(\\alpha\\) with \\(\\kappa > 0\\) is a Bertrand curve if and only if there exist constants \\(a, b \\in \\mathbb{R}\\) (with \\(a \\neq 0\\)) such that</p>
        \\[a\\kappa + b\\tau = 1.\\]
        <p>In particular, circular helices (constant \\(\\kappa\\) and \\(\\tau\\)) and plane curves (\\(\\tau = 0\\)) are always Bertrand curves.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-helix-classification"></div>
<div class="viz-placeholder" data-viz="viz-evolute"></div>
`,
            visualizations: [
                // === VIZ 6: Helix classification — kappa/tau = const slider ===
                {
                    id: 'viz-helix-classification',
                    title: 'Helix Classification: Constant \u03BA/\u03C4',
                    description: 'Adjust kappa and tau. When their ratio is constant, the curve is a helix and makes a constant angle with a fixed axis. The angle indicator confirms this.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 240, originY: 220, scale: 50
                        });

                        var kappaVal = 1.0;
                        var tauVal = 0.4;
                        VizEngine.createSlider(controls, '\u03BA', 0.2, 2.0, kappaVal, 0.1, function(v) { kappaVal = v; draw(); });
                        VizEngine.createSlider(controls, '\u03C4', -1.5, 1.5, tauVal, 0.1, function(v) { tauVal = v; draw(); });

                        var ca = Math.cos(0.6), sa = Math.sin(0.6);
                        function proj(x, y, z) { return [x + 0.35*z*ca, y + 0.35*z*sa]; }

                        function norm3(v) { return Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]); }
                        function scale3(v, s) { return [v[0]*s, v[1]*s, v[2]*s]; }
                        function add3(a, b) { return [a[0]+b[0], a[1]+b[1], a[2]+b[2]]; }

                        function reconstructConst(kappa, tau, sMax, ds) {
                            var T = [1,0,0], N = [0,1,0], B = [0,0,1];
                            var pos = [0,0,0];
                            var points = [pos.slice()];
                            for (var s = 0; s < sMax; s += ds) {
                                var dT = scale3(N, kappa*ds);
                                var dN = add3(scale3(T, -kappa*ds), scale3(B, tau*ds));
                                var dB = scale3(N, -tau*ds);
                                T = add3(T, dT); N = add3(N, dN); B = add3(B, dB);
                                var nT = norm3(T); T = scale3(T, 1/nT);
                                var d = T[0]*N[0]+T[1]*N[1]+T[2]*N[2];
                                N = [N[0]-d*T[0], N[1]-d*T[1], N[2]-d*T[2]];
                                var nN = norm3(N); N = scale3(N, 1/nN);
                                B = [T[1]*N[2]-T[2]*N[1], T[2]*N[0]-T[0]*N[2], T[0]*N[1]-T[1]*N[0]];
                                pos = add3(pos, scale3(T, ds));
                                points.push(pos.slice());
                            }
                            return points;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var ratio = Math.abs(tauVal) < 0.01 ? '\u221E (plane curve)' : (kappaVal / tauVal).toFixed(2);
                            var isHelix = true; // constant kappa, tau => always helix
                            var angle = Math.abs(tauVal) < 0.01 ? 90 : (Math.atan(kappaVal / tauVal) * 180 / Math.PI);

                            viz.screenText('Constant \u03BA = ' + kappaVal.toFixed(1) + ', \u03C4 = ' + tauVal.toFixed(1), viz.width/2, 16, viz.colors.white, 14);
                            viz.screenText('\u03BA/\u03C4 = ' + ratio + '  (constant \u2192 general helix)', viz.width/2, 36, viz.colors.teal, 12);

                            var pts = reconstructConst(kappaVal, tauVal, 15, 0.02);

                            // Draw curve
                            ctx.strokeStyle = viz.colors.yellow; ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i < pts.length; i++) {
                                var pp = proj(pts[i][0], pts[i][1], pts[i][2]);
                                var sx = viz.originX + pp[0]*viz.scale;
                                var sy = viz.originY - pp[1]*viz.scale;
                                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Angle indicator
                            if (Math.abs(tauVal) > 0.01) {
                                var theta = Math.atan2(kappaVal, tauVal);
                                viz.screenText('Helix angle \u03B8 = ' + angle.toFixed(1) + '\u00B0 with axis', viz.width/2, viz.height - 20, viz.colors.orange, 12);

                                // Draw angle arc
                                var arcX = viz.width - 80, arcY = viz.height - 80;
                                var arcR = 30;
                                ctx.strokeStyle = viz.colors.purple; ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(arcX, arcY);
                                ctx.lineTo(arcX, arcY - 40);
                                ctx.stroke();
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(arcX, arcY);
                                ctx.lineTo(arcX + 40*Math.sin(theta), arcY - 40*Math.cos(theta));
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.arc(arcX, arcY, arcR, -Math.PI/2, -Math.PI/2 + theta, false);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('\u03B8', arcX + arcR*0.6*Math.sin(theta/2) + 2, arcY - arcR*0.6*Math.cos(theta/2));
                                ctx.fillText('axis', arcX + 3, arcY - 43);
                            } else {
                                viz.screenText('\u03C4 = 0: curve lies in a plane', viz.width/2, viz.height - 20, viz.colors.orange, 12);
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                // === VIZ 7: Evolute — locus of centers of curvature ===
                {
                    id: 'viz-evolute',
                    title: 'Evolute: Centers of Curvature',
                    description: 'The evolute of a plane curve is the locus of its centers of curvature. Watch the center of the osculating circle trace out the evolute as the point moves along the curve.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 220, scale: 55
                        });

                        var t0 = 0;
                        var animating = true;
                        var showOscCircle = true;

                        VizEngine.createButton(controls, 'Pause / Play', function() { animating = !animating; });
                        VizEngine.createButton(controls, 'Toggle Osculating Circle', function() { showOscCircle = !showOscCircle; });

                        // Ellipse as base curve
                        var aE = 2.5, bE = 1.5;
                        function curve(tt) { return [aE*Math.cos(tt), bE*Math.sin(tt)]; }

                        function curveD(tt) {
                            var h = 0.0001;
                            var c1 = curve(tt-h), c2 = curve(tt+h);
                            return [(c2[0]-c1[0])/(2*h), (c2[1]-c1[1])/(2*h)];
                        }
                        function curveDD(tt) {
                            var h = 0.0001;
                            var c0 = curve(tt-h), c1 = curve(tt), c2 = curve(tt+h);
                            return [(c2[0]-2*c1[0]+c0[0])/(h*h), (c2[1]-2*c1[1]+c0[1])/(h*h)];
                        }

                        function getCenter(tt) {
                            var p = curve(tt), d = curveD(tt), dd = curveDD(tt);
                            var speed2 = d[0]*d[0]+d[1]*d[1];
                            var speed = Math.sqrt(speed2);
                            var signedK = (d[0]*dd[1]-d[1]*dd[0]) / (speed*speed*speed);
                            if (Math.abs(signedK) < 1e-10) return null;
                            var R = 1 / signedK;
                            var N = [-d[1]/speed, d[0]/speed];
                            return { center: [p[0]+R*N[0], p[1]+R*N[1]], R: Math.abs(R), kappa: Math.abs(signedK) };
                        }

                        viz.animate(function() {
                            if (animating) t0 += 0.01;
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Evolute of an Ellipse', viz.width/2, 16, viz.colors.white, 14);
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Draw ellipse
                            ctx.strokeStyle = viz.colors.white + '66'; ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 300; i++) {
                                var tt = (i/300)*2*Math.PI;
                                var pt = curve(tt);
                                var sc = viz.toScreen(pt[0], pt[1]);
                                if (i === 0) ctx.moveTo(sc[0], sc[1]); else ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.stroke();

                            // Draw evolute (full)
                            ctx.strokeStyle = viz.colors.purple; ctx.lineWidth = 2;
                            ctx.beginPath();
                            var started = false;
                            for (var j = 0; j <= 400; j++) {
                                var tt2 = (j/400)*2*Math.PI;
                                var cen = getCenter(tt2);
                                if (!cen) { started = false; continue; }
                                var sc2 = viz.toScreen(cen.center[0], cen.center[1]);
                                if (!started) { ctx.moveTo(sc2[0], sc2[1]); started = true; }
                                else ctx.lineTo(sc2[0], sc2[1]);
                            }
                            ctx.stroke();

                            // Current point and osculating circle
                            var tCur = t0 % (2*Math.PI);
                            var pos = curve(tCur);
                            var cenCur = getCenter(tCur);

                            viz.drawPoint(pos[0], pos[1], viz.colors.yellow, null, 5);

                            if (cenCur) {
                                // Center of curvature
                                viz.drawPoint(cenCur.center[0], cenCur.center[1], viz.colors.purple, null, 4);

                                // Line from point to center
                                viz.drawSegment(pos[0], pos[1], cenCur.center[0], cenCur.center[1], viz.colors.green + '55', 1, true);

                                // Osculating circle
                                if (showOscCircle) {
                                    viz.drawCircle(cenCur.center[0], cenCur.center[1], cenCur.R, null, viz.colors.teal + '44', 1);
                                }

                                viz.screenText('R = 1/\u03BA = ' + (1/cenCur.kappa).toFixed(2), viz.width/2, viz.height - 20, viz.colors.teal, 12);
                            }

                            // Labels
                            viz.screenText('Ellipse', 50, 80, viz.colors.white, 11, 'left');
                            viz.screenText('Evolute', 50, 96, viz.colors.purple, 11, 'left');
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that a curve with \\(\\tau = 0\\) lies in a plane. (Fill in the details of the proof in the text.)',
                    hint: 'Show \\(\\mathbf{B}\' = 0\\) implies \\(\\mathbf{B}\\) is constant, then show \\((\\alpha - \\alpha_0) \\cdot \\mathbf{B}\\) is constant.',
                    solution: 'If \\(\\tau = 0\\), then \\(\\mathbf{B}\' = -\\tau\\mathbf{N} = 0\\), so \\(\\mathbf{B}\\) is a constant vector. Define \\(f(s) = (\\alpha(s) - \\alpha(s_0)) \\cdot \\mathbf{B}\\). Then \\(f\'(s) = \\alpha\'(s) \\cdot \\mathbf{B} = \\mathbf{T}(s) \\cdot \\mathbf{B} = 0\\) (since \\(\\mathbf{T} \\perp \\mathbf{B}\\)). Also \\(f(s_0) = 0\\). So \\(f(s) = 0\\) for all \\(s\\), meaning \\(\\alpha(s) - \\alpha(s_0)\\) is always perpendicular to \\(\\mathbf{B}\\). The curve lies in the plane through \\(\\alpha(s_0)\\) with normal \\(\\mathbf{B}\\).'
                },
                {
                    question: 'A circular helix has \\(\\kappa = 1\\) and \\(\\tau = 1\\). What is the helix angle \\(\\theta\\)? Verify that \\(a\\kappa + b\\tau = 1\\) has solutions, confirming it is a Bertrand curve.',
                    hint: 'The helix angle satisfies \\(\\cot\\theta = \\tau/\\kappa\\). For the Bertrand condition, find constants \\(a, b\\) with \\(a + b = 1\\).',
                    solution: 'Since \\(\\tau/\\kappa = 1\\), we have \\(\\cot\\theta = 1\\), so \\(\\theta = 45^\\circ\\). The tangent makes a \\(45^\\circ\\) angle with the helix axis. For the Bertrand condition: \\(a \\cdot 1 + b \\cdot 1 = 1\\), so \\(a + b = 1\\). Any pair \\((a, b)\\) with \\(a + b = 1\\) and \\(a \\neq 0\\) works, e.g., \\(a = 1, b = 0\\) or \\(a = 1/2, b = 1/2\\). So the helix is indeed a Bertrand curve.'
                },
                {
                    question: 'Compute the evolute of the ellipse \\(\\alpha(t) = (a\\cos t, b\\sin t)\\). Show that it is an astroid-like curve.',
                    hint: 'The center of curvature is \\(\\alpha(t) + \\frac{1}{\\kappa}\\mathbf{N}(t)\\). Compute \\(\\kappa\\) for the ellipse and simplify.',
                    solution: 'For the ellipse, \\(\\alpha\'(t) = (-a\\sin t, b\\cos t)\\), \\(\\|\\alpha\'\\|^2 = a^2\\sin^2 t + b^2\\cos^2 t\\). The signed curvature is \\(\\kappa = \\frac{ab}{(a^2\\sin^2 t + b^2\\cos^2 t)^{3/2}}\\). The center of curvature is \\(\\left(\\frac{a^2-b^2}{a}\\cos^3 t,\\; \\frac{b^2-a^2}{b}\\sin^3 t\\right)\\), which is an astroid with semi-axes \\(\\frac{a^2-b^2}{a}\\) and \\(\\frac{a^2-b^2}{b}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>From Curves to Surfaces</h2>

<p>The Frenet-Serret apparatus has given us a complete understanding of the local geometry of space curves. The curvature \\(\\kappa\\) and torsion \\(\\tau\\) are the fundamental invariants, the TNB frame is the natural coordinate system, the Frenet-Serret equations govern the frame's evolution, and the Fundamental Theorem tells us these invariants determine the curve uniquely (up to rigid motion).</p>

<h3>The Pattern That Repeats</h3>

<p>Notice the pattern we have established for curves:</p>
<ol>
    <li><strong>Parametrization</strong> and regularity conditions (Ch. 0)</li>
    <li><strong>Invariants</strong>: curvature \\(\\kappa\\) and torsion \\(\\tau\\) (Ch. 1)</li>
    <li><strong>Moving frame</strong>: the TNB frame adapted to the geometry (Ch. 2)</li>
    <li><strong>Structure equations</strong>: the Frenet-Serret equations (Ch. 2)</li>
    <li><strong>Fundamental theorem</strong>: invariants determine the object up to symmetry (Ch. 2)</li>
</ol>

<p>This exact same pattern will repeat for surfaces, with deeper structure at each step:</p>

<table style="width:100%;border-collapse:collapse;margin:1rem 0;">
    <thead>
        <tr style="border-bottom:2px solid var(--border-default);">
            <th style="padding:8px;text-align:left;color:var(--accent-blue);">Concept</th>
            <th style="padding:8px;text-align:left;">Curves</th>
            <th style="padding:8px;text-align:left;">Surfaces (coming)</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom:1px solid var(--border-subtle);">
            <td style="padding:8px;">Object</td>
            <td style="padding:8px;">\\(\\alpha: I \\to \\mathbb{R}^3\\)</td>
            <td style="padding:8px;">\\(\\mathbf{x}: U \\subset \\mathbb{R}^2 \\to \\mathbb{R}^3\\)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-subtle);">
            <td style="padding:8px;">Regularity</td>
            <td style="padding:8px;">\\(\\alpha' \\neq 0\\)</td>
            <td style="padding:8px;">\\(\\mathbf{x}_u \\times \\mathbf{x}_v \\neq 0\\)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-subtle);">
            <td style="padding:8px;">Invariants</td>
            <td style="padding:8px;">\\(\\kappa, \\tau\\) (2 functions of 1 variable)</td>
            <td style="padding:8px;">\\(K, H\\) or \\(\\kappa_1, \\kappa_2\\) (functions of 2 variables)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-subtle);">
            <td style="padding:8px;">Frame</td>
            <td style="padding:8px;">\\(\\{\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\}\\)</td>
            <td style="padding:8px;">\\(\\{\\mathbf{e}_1, \\mathbf{e}_2, \\mathbf{n}\\}\\)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-subtle);">
            <td style="padding:8px;">Structure eq.</td>
            <td style="padding:8px;">Frenet-Serret</td>
            <td style="padding:8px;">Gauss-Weingarten</td>
        </tr>
        <tr>
            <td style="padding:8px;">Fund. theorem</td>
            <td style="padding:8px;">\\(\\kappa, \\tau\\) determine curve</td>
            <td style="padding:8px;">Bonnet's theorem</td>
        </tr>
    </tbody>
</table>

<h3>What Comes Next</h3>

<p>In <strong>Chapter 3</strong>, we transition from curves to <strong>regular surfaces</strong>. A surface is a 2-dimensional object in \\(\\mathbb{R}^3\\); instead of one parameter \\(s\\), we need two parameters \\((u, v)\\). The key challenge is that surfaces can curve in two independent directions, leading to the richer notion of <em>principal curvatures</em>. The first fundamental form (Ch. 4) will play the role that arc length parametrization played for curves.</p>

<div class="env-block remark">
    <div class="env-title">The Bigger Picture</div>
    <div class="env-body">
        <p>The Frenet-Serret frame is the simplest example of a <em>connection</em> on a <em>frame bundle</em>. In Part E (Riemannian Geometry), we will see that the Levi-Civita connection generalizes the Frenet-Serret equations to arbitrary Riemannian manifolds, and curvature tensors generalize \\(\\kappa\\) and \\(\\tau\\). The skew-symmetry of the Frenet matrix is a shadow of the fact that connections take values in Lie algebras.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'For a curve in \\(\\mathbb{R}^n\\) (\\(n > 3\\)), the Frenet frame has \\(n\\) vectors and the structure equations involve \\(n-1\\) generalized curvatures \\(\\kappa_1, \\ldots, \\kappa_{n-1}\\). Why \\(n-1\\) curvatures?',
                    hint: 'The Frenet matrix is \\(n \\times n\\) skew-symmetric with entries only on the super- and sub-diagonals.',
                    solution: 'The generalized Frenet matrix is \\(n \\times n\\) skew-symmetric and tridiagonal. A skew-symmetric matrix has zeros on the diagonal, and the tridiagonal structure means only the entries just above and below the diagonal are nonzero: \\(\\kappa_1, \\ldots, \\kappa_{n-1}\\). There are \\(n-1\\) such entries. Geometrically, \\(\\kappa_i\\) measures how fast the \\(i\\)-th Frenet vector rotates toward the \\((i+1)\\)-th. For \\(n=3\\): \\(\\kappa_1 = \\kappa\\) (curvature) and \\(\\kappa_2 = \\tau\\) (torsion).'
                }
            ]
        }
    ]
});
