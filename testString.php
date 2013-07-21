<?php
echo mb_strwidth('東京都品川区東品川2-2-2412012', 'UTF-8');
echo mb_strwidth('東京都品川区東品川1234567890123456789012345678', 'UTF-8');
echo mb_strimwidth('東京都品川区東品川2-2-241201', 0, 27, '…', 'UTF-8');
?>
