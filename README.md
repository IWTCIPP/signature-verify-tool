# README

## Overview

This tool verifies signatures made with my private key. It can extract and verify signatures from images that I upload to [Catbox](https://catbox.moe/) as well as verify signatures for plain messages. See [the gen-authorship-proofs README](https://github.com/IWTCIPP/gen-authorship-proofs#readme) for the motivation behind this tool.

It requires [Node.js](https://nodejs.org/) and, if verifying signatures on images, [ExifTool](https://exiftool.org/).

## Usage Examples

```shellsession
$ node verify.js https://files.catbox.moe/xvws5b.jpg
Downloading https://files.catbox.moe/xvws5b.jpg...
Last modified: Tue, 31 Dec 2024 20:15:21 GMT
Artist: IWTCIPP (signature: EB+yOtwoM4ftj9Vze8Zj/l6EVFWxtZy8hqDxaYUtUjs5bjc9QxEm
uheTNLSaHWAXNFcg1Adsv8wzYEr9h7a3b7vdV5w2E5hnDJS9mq0Cu0cJ+RUhmSQTHwyELtVRMMU7qreJ
pf5E5vtD7OyUg1VtQA0lAH2vp/a1F68Ru6FmqCqun57bg3RHBJGoDO0aO7iQT5g0pQ5AJSYQfCghKZ67
1JpjGGyFEk8Y2qEXNxSfbtjdup4zGzEvzB0jORc7C+yTDe1P7+/zmA9smwFqkjySxSiIAFyvxHYv40JN
fEMGy1xmDokX6m/v+Io+D7C/mR6gE4qSPwuiIf4hQw8J8/NcLDJaJrA52XFqF19vomSRl44vNgaJf4qL
mo8hfI0YwbzRoZ+ESQUvIwGeukSZg9RU10dxihdh62MvFe5HBy6TqqWs2CRCJMw/c0GrINHnhKpjJFNi
JgCwztxP34kZ9pnVRq0BqDQPh5nxJvw3E5+dNuuGFqPeZcE36NSU889i8NCBE2na8z89umws1zELWk0I
S4J+nO6BW7SEpo5doP13C7CEQZvxEsvnU46+GQesj+tERXhbPrtHwlUGaBIG2WEUzyIYwvP7hf32ASy3
mqXHMTRfONPAK/u9aX9gDDvKJ2Odtkm/p/fTiNGi2UEWgM3bfComIPs+TqcMoUNbwLDh3TE=)
Signature is valid.

$ node verify.js ydv1k6.jpg
Artist: IWTCIPP (signature: MXh/+ApogqZm0Go6rdRsOt4JgeMq1PC0A0acKMW9Gwk/BOxjx/+I
Xq/WI6A+Jn2rgiCXxHuQ8kX1/w+1awa037XI9+nqmzUK5vvx+1YZBcQKM6EjWTSb+qkAgX7LjViFZNns
QpEygUnU61BbXcW0dqEr3lbtxoM2vGPx6S160AWsdUC9NwwKjzL4aS9xUxnSUxN7le6hxm/0CstaYBBw
Fx3XxYc64RI1odDEYQfZmofq58CGW5+5KhpDbl+3lwV3CjP432zYyIb+gGzWcFkrVieEywancKqLhCrI
H3TyzmMRierEftElfK1ZVatFlc9zSnhfmlhKW1G749c2Wz4I8D6X9yd/MM+ujGIwhKMr3ezcFkXQO0Z3
CXvlZPOezO9IEPshcapcQixJnjv1DJvhm7nI1kngU8i4bSchrYu2R1gePDOH3JTrT8Gal8qTZJbyhSU1
pCti2V40jDaEcaqNr3e+WeK4kWcx/qEIo2fgEdfoMD73rskFiMqKFU7LOovHZzoZ2A9yrfUEqkr26U1m
7RU6rXWmjG6v9t9cgIDzV9Ab3UuzEehOgk739DMhKJ25DVLCFiWvDe85OCSZhiehTyX4zkyMVUP9N0be
3Ka4N0nuo/L9+Wm2eNc3CKxhhmanVF/pJUbe5ZBw3TCwhbq2Yzm3IqqWCTqiCx2WXLqkI+4=)
Signature is valid.

$ node verify.js --message "https://github.com/IWTCIPP is me" --signature NNGwZ\
> QfWlhqCQu7ZIaOLAd4Z32DpMrhAPN3/tY7crE0ftDqyrQOZzXbZ9cLRHdbbRE4Hw65+oZlYGgs9tV\
> YLoRdOn0+itxgPqqiN/OAjCqrSui13COL/O7vFVKgSnfduWAt/uVeuVeR7cuCki0UrW3P/OO5mC5e\
> jHefniAk1bZa0bIUfBMSCj8Ch/F14rzquShfqA0kQmiSYmK+YG5aFOsFAkFP8D1ZgPT5a7AtSt0BJ\
> I0MBZZyGA53MAIqS9XlCPHy0LA/ad/nlAp+0YXWyD6K0QK1tIo7Fnj/pYho1uOJn1U1g5qVqwey9B\
> CmnSJSgmHw80KKeBIlNbKcciuII2cTGqTuDNlFN3SjX1B0lwCWpk+31Q64PtK/docN8c0YQWXDQ7Q\
> W5/XP7EYiAzV3APM2tqvT4MeMm4PQBeMoXYJ8gOBte6Cg9Gws4T+wgAgmZyFRsmvRahdnFMJaU7+R\
> ptfhrBWtFUmy4d3Xt5mnedrigXRD9CFx4MqqLVPH7zzTHAlnbQomaBg1bisVB7H7cuvy6pvl+qvuK\
> Tbv4MCtZ9w6i4cgEnb863dTJ3mMMzXx7N77OpUpW+HU12o+mlT5Reh42CEJr/bpjwY1GqBL8LwCtK\
> FQIzgEpWDqmT/+bPnq4ISwgos66YfTjJ0Hb/NzwmWlXFezJ760LF8zYBzbc3sU=
Signature is valid.
```
