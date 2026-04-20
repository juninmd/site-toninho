import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Fix Google Analytics (Line 43-49 area)
gtag_old = """  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-XXXXXXXXXX');
  </script>"""

gtag_new = """  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(...args) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>"""
content = content.replace(gtag_old, gtag_new)

# If it was formatted by prettier:
gtag_old_prettier = """    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-XXXXXXXXXX");
    </script>"""

gtag_new_prettier = """    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(...args) {
        window.dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", "G-XXXXXXXXXX");
    </script>"""
content = content.replace(gtag_old_prettier, gtag_new_prettier)


# 2. Fix Facebook Pixel (removing document.createElement, arguments)
fbq_old = """    <!-- Meta Pixel Code -->
    <script>
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js",
      );
      fbq("init", "XXXXXXXXXXXXXXXX");
      fbq("track", "PageView");
    </script>
    <!-- End Meta Pixel Code -->"""

fbq_new = """    <!-- Meta Pixel Code -->
    <script async src="https://connect.facebook.net/en_US/fbevents.js"></script>
    <script>
      if (!window.fbq) {
        window.fbq = function (...args) {
          if (window.fbq.callMethod) {
            window.fbq.callMethod(...args);
          } else {
            window.fbq.queue.push(args);
          }
        };
        window._fbq = window.fbq;
        window.fbq.push = window.fbq;
        window.fbq.loaded = true;
        window.fbq.version = "2.0";
        window.fbq.queue = [];
      }
      window.fbq("init", "XXXXXXXXXXXXXXXX");
      window.fbq("track", "PageView");
    </script>
    <!-- End Meta Pixel Code -->"""
content = content.replace(fbq_old, fbq_new)


# 3. Fix Video element (add track)
video_old = """        <video
          autoplay
          muted
          loop
          playsinline
          class="hero-video"
          poster="fotoAntonio.jpg"
        >
          <source src="video.mp4" type="video/mp4" />
        </video>"""
video_new = """        <video
          autoplay
          muted
          loop
          playsinline
          class="hero-video"
          poster="fotoAntonio.jpg"
        >
          <source src="video.mp4" type="video/mp4" />
          <track kind="captions" src="captions.vtt" srclang="pt" label="Português" />
        </video>"""
content = content.replace(video_old, video_new)


# 4. Fix role="img" with aria-label
# We replace:
#               <div
#                 class="testimonial-rating"
#                 role="img"
#                 aria-label="Avaliação: 5 estrelas"
#                 style="color: var(--gold); margin-bottom: 10px"
#               >

div_old = """              <div
                class="testimonial-rating"
                role="img"
                aria-label="Avaliação: 5 estrelas"
                style="color: var(--gold); margin-bottom: 10px"
              >"""
div_new = """              <div class="testimonial-rating" style="color: var(--gold); margin-bottom: 10px">
                <span style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;">Avaliação: 5 estrelas</span>"""

content = content.replace(div_old, div_new)

with open('index.html', 'w') as f:
    f.write(content)
