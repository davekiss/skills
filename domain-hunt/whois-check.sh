#!/bin/bash
# Availability via the registry's own WHOIS, for TLDs Cloudflare doesn't sell.
# usage: whois-check.sh name.tld...   (all names must share one TLD)
# Calibrates on a nonsense name: a response identical to that one means unregistered.
set -u
tld="${1##*.}"
server=$(whois -h whois.iana.org "$tld" | awk '/^whois:/{print $2; exit}')
[ -z "$server" ] && { echo "no WHOIS server for .$tld" >&2; exit 1; }
body() { whois -h "$server" "$1" 2>/dev/null | grep -v '^[%#>]' | grep -v '^[[:space:]]*$' | grep -vi 'last update\|timestamp'; }
baseline=$(body "zqxv$RANDOM$RANDOM.$tld")
for d in "$@"; do
  if [ "$(body "$d")" = "$baseline" ]; then echo "OPEN  $d"; else echo "taken $d"; fi
done
