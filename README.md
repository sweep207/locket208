# Locket208 — SWEEP207

Cloudflare Worker tạo trang tải và hồ sơ DNS-over-HTTPS cho iPhone/iPad.

## Routes
- `/`: giao diện cài đặt.
- `/profile.mobileconfig`: tạo Apple configuration profile với UUID mới.
- `/api/status`: trạng thái JSON.

## DNS & privacy
Dùng Cloudflare Public DNS qua HTTPS: `https://cloudflare-dns.com/dns-query`. Truy vấn DNS thiết bị được gửi tới Cloudflare. Xem chính sách quyền riêng tư Cloudflare trước khi cài.

## Security
Không cài root CA hoặc chứng chỉ trung gian. Không can thiệp API Locket, RevenueCat, Firebase, biên nhận mua hàng hoặc trạng thái thuê bao. Không mở khóa Gold.

File mobileconfig gốc được cung cấp chứa root CA tự ký "Gold MPhong CA" và DNS server riêng `160.22.107.180`; không nên cài CA không rõ nguồn gốc. Locket208 không sao chép chứng chỉ đó.

## Deploy
```bash
npm install -g wrangler
wrangler login
wrangler deploy
```
Sau deploy, kiểm tra `/api/status` và tải hồ sơ ở `/profile.mobileconfig`.

Gỡ profile trên iPhone: Cài đặt → Cài đặt chung → VPN & Quản lý thiết bị → Locket208 → Xóa hồ sơ.
