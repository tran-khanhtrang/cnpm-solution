async function testRateLimit() {
    console.log("Bắt đầu gửi lô 110 requests liên tục đến API...");
    let successCount = 0;
    let failCount = 0;

    // Gửi 110 requests song song
    const requests = Array.from({ length: 110 }).map(async (_, i) => {
        try {
            const res = await fetch('http://localhost:3001/api/product/get-all');
            if (res.ok) {
                successCount++;
                if (i === 0 || i === 10) console.log(`[Request ${i + 1}] Thành công: HTTP Status ${res.status}`);
            } else if (res.status === 429) {
                failCount++;
                if (failCount === 1) {
                    const errorText = await res.text();
                    console.log(`\n[!] PHÁT HIỆN REQUEST BỊ BLOCK! (Bắt đầu từ request rớt mạng đầu tiên)`);
                    console.log(`Mã lỗi (Status Code): ${res.status}`);
                    console.log(`Thông báo từ Server: "${errorText}"\n`);
                }
            } else {
                console.log(`[Request ${i + 1}] Lỗi khác: HTTP Status ${res.status}`);
            }
        } catch (err) {
            console.log(`[Request ${i + 1}] Lỗi kết nối: ${err.message}`);
        }
    });

    await Promise.all(requests);

    console.log("=== TỔNG KẾT BÀI TEST RATE-LIMITING ===");
    console.log(`- Request chọt lọt (Thành công): ${successCount}`);
    console.log(`- Request BỊ SERVER ĐÁ VĂNG (Blocked): ${failCount}`);
    if (failCount > 0) {
        console.log("=> KẾT LUẬN: Hàng rào Rate-Limit HOẠT ĐỘNG HOÀN HẢO! Server đã chặn đứng cuộc tấn công DDoS nhỏ này.");
    }
}

testRateLimit();
