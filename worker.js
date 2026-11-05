const DNS_URL = "https://cloudflare-dns.com/dns-query";
const DNS_IPS = ["1.1.1.1", "1.0.0.1"];
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[c]));
const uuid = () => crypto.randomUUID().toUpperCase();
const plist = v => {
  if (typeof v === "string") return "<string>"+esc(v)+"</string>";
  if (typeof v === "number") return "<integer>"+v+"</integer>";
  if (typeof v === "boolean") return v ? "<true/>" : "<false/>";
  if (Array.isArray(v)) return "<array>"+v.map(plist).join("")+"</array>";
  return "<dict>"+Object.entries(v).map(([k,x])=>"<key>"+esc(k)+"</key>"+plist(x)).join("")+"</dict>";
};
function makeProfile() {
  const p = {PayloadContent:[{DNSSettings:{DNSProtocol:"HTTPS",ServerAddresses:DNS_IPS,ServerURL:DNS_URL,SupplementalMatchDomains:[]},PayloadDescription:"Cloudflare Public DNS over HTTPS. No certificate is installed.",PayloadDisplayName:"Locket208 DNS",PayloadIdentifier:"dev.sweep207.locket208.dns",PayloadType:"com.apple.dnsSettings.managed",PayloadUUID:uuid(),PayloadVersion:1}],PayloadDescription:"Secure DNS profile. Does not unlock paid features.",PayloadDisplayName:"Locket208",PayloadIdentifier:"dev.sweep207.locket208.profile",PayloadOrganization:"SWEEP207",PayloadRemovalDisallowed:false,PayloadType:"Configuration",PayloadUUID:uuid(),PayloadVersion:1};
  return '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">'+plist(p)+'</plist>';
}
const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0b1028"><title>Locket208 · SWEEP207</title><style>*{box-sizing:border-box}body{margin:0;min-height:100vh;padding:24px 16px;display:grid;place-items:center;background:radial-gradient(circle at 15% 15%,#31205f,transparent 35%),radial-gradient(circle at 85% 80%,#153b68,transparent 35%),#090d20;color:#f4efff;font:16px -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif}main{width:min(100%,540px);padding:30px;border:1px solid #62518d;border-radius:26px;background:#151a35f2;box-shadow:0 24px 80px #0008;text-align:center}.tag{color:#c4a7ff;letter-spacing:.16em;font-weight:800;font-size:12px}h1{font-size:36px;margin:14px 0}p{color:#c5c3dc;line-height:1.65}a{display:block;padding:17px;margin-top:24px;border-radius:14px;background:linear-gradient(110deg,#a17aff,#6241d7);color:white;text-decoration:none;font-weight:800}.details{margin-top:22px;padding:14px;border:1px solid #393b60;border-radius:14px;text-align:left;color:#d4d0e9;font-size:14px;line-height:1.8}.note{margin-top:16px;padding:13px;border-radius:12px;background:#302849;color:#e6dafa;font-size:13px;line-height:1.6}small{display:block;color:#aaa6c8;margin-top:18px;line-height:1.6}</style></head><body><main><div class="tag">SWEEP207 · IOS CONFIGURATION</div><h1>Locket208</h1><p>Hồ sơ DNS-over-HTTPS cho iPhone và iPad.</p><a href="/profile.mobileconfig">↓ Tải hồ sơ DNS</a><div class="details"><b>DNS:</b> HTTPS (DoH)<br><b>Nhà cung cấp:</b> Cloudflare Public DNS<br><b>Máy chủ:</b> 1.1.1.1 · 1.0.0.1<br><b>Chứng chỉ CA:</b> Không cài đặt</div><div class="note">Hồ sơ DNS không mở khóa Locket Gold hoặc thay đổi trạng thái thuê bao.</div><small>Mở bằng Safari, sau đó vào Cài đặt → Đã tải về hồ sơ. Có thể gỡ bất cứ lúc nào.</small></main></body></html>`;
export default {async fetch(req) {
  const u=new URL(req.url), h={"X-Content-Type-Options":"nosniff","Referrer-Policy":"no-referrer","Cache-Control":"no-store"};
  if(req.method!=="GET"&&req.method!=="HEAD") return new Response("Method Not Allowed",{status:405,headers:{...h,Allow:"GET, HEAD"}});
  if(u.pathname==="/") return new Response(html,{headers:{...h,"Content-Type":"text/html; charset=utf-8"}});
  if(u.pathname==="/profile.mobileconfig") return new Response(makeProfile(),{headers:{...h,"Content-Type":"application/x-apple-aspen-config; charset=utf-8",'Content-Disposition':'attachment; filename="Locket208.mobileconfig"'}});
  if(u.pathname==="/api/status") return Response.json({project:"Locket208",status:"ok",dns:"Cloudflare DoH",rootCertificate:false,subscriptionModification:false},{headers:h});
  return new Response("Not Found",{status:404,headers:h});
}};
