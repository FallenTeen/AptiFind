<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Riwayat Tes Minat & Bakat</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; }
        .title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .subtitle { font-size: 14px; margin-bottom: 8px; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { border: 1px solid #888; padding: 6px; text-align: left; }
        th { background: #f0f0f0; }
        .summary { margin: 12px 0; }
    </style>
</head>
<body>
    <div class="title">Riwayat Tes Minat & Bakat</div>
    <div class="subtitle">Nama: {{ $jawaban->user->name ?? '-' }}</div>
    <div class="subtitle">Paket: {{ $jawaban->paketSoal->nama_paket ?? '-' }}</div>
    <div class="subtitle">Tanggal: {{ $jawaban->waktu_selesai }}</div>
    <div class="summary">
        <b>Skor Minat:</b> {{ $jawaban->skor_minat }}<br>
        <b>Skor Bakat:</b> {{ $jawaban->skor_bakat }}<br>
        <b>Quadrant:</b> {{ $jawaban->quadrant }}<br>
    </div>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Soal</th>
                <th>Jawaban</th>
                <th>Bobot Minat</th>
                <th>Bobot Bakat</th>
            </tr>
        </thead>
        <tbody>
        @foreach($jawaban->detailJawabanUser as $i => $d)
            <tr>
                <td>{{ $i+1 }}</td>
                <td>{{ $d->soal->text_soal ?? '-' }}</td>
                <td>{{ $d->jawaban === 'yes' ? 'Ya' : 'Tidak' }}</td>
                <td>{{ $d->bobot_minat }}</td>
                <td>{{ $d->bobot_bakat }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
    <div class="summary">
        <b>Keterangan Quadrant:</b><br>
        I: minat+ bakat+ → cocok dan lanjutkan<br>
        II: minat+ bakat- → butuh latihan<br>
        III: minat- bakat- → perlu diskusi lebih lanjut<br>
        IV: minat- bakat+ → butuh pengembangan minat
    </div>
</body>
</html>
