import csv
from collections import defaultdict

# 讀取CSV文件並將資料存儲在列表中
lottery_data = []
with open("539_data.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        # 初始化字典來計算每個號碼的出現次數
        date = row[1]
        numbers = [int(num) for num in row[2:]]
        lottery_data.append((date, numbers))

number_gaps = defaultdict(list)

# 初始化字典來存儲每個號碼的上次出現期數
last_occurrence = defaultdict(int)

# 初始化字典來存儲每個號碼的最長間隔
max_gaps = defaultdict(int)


# 遍歷所有開獎結果，計算每個號碼的間隔
for index, (_, numbers) in enumerate(lottery_data):
    for number in numbers:
        # 如果號碼在之前已經出現過，計算間隔
        if last_occurrence[number] != 0 or len(number_gaps[number]) == 0:
            gap = index + 1 - last_occurrence[number] - 1
            number_gaps[number].append(gap)
            max_gaps[number] = max(max_gaps[number], gap)
        # 更新號碼的上次出現期數
        last_occurrence[number] = index + 1

count_0_9 = 0
count_10_19 = 0
count_20_29 = 0
count_30_39 = 0
count_40_49 = 0
count_50_59 = 0
count_60_69 = 0
count_70_79 = 0
count_80_89 = 0
count_above_90 = 0


for _, number_gap in number_gaps.items():
    for number in number_gap:
        if 0 <= number < 10:
            count_0_9 += 1
        elif 10 <= number < 20:
            count_10_19 += 1
        elif 20 <= number < 30:
            count_20_29 += 1
        elif 30 <= number < 40:
            count_30_39 += 1
        elif 40 <= number < 50:
            count_40_49 += 1
        elif 50 <= number < 60:
            count_50_59 += 1
        elif 60 <= number < 70:
            count_60_69 += 1
        elif 70 <= number < 80:
            count_70_79 += 1
        elif 80 <= number < 90:
            count_80_89 += 1
        else:
            count_above_90 += 1

total_count = len(lottery_data) * 5

print(f"0~9範圍內的數量: {count_0_9}，機率為 {(count_0_9/total_count):.7f}")
print(f"10~19範圍內的數量: {count_10_19}，機率為 {(count_10_19/total_count):.7f}")
print(f"20~29範圍內的數量: {count_20_29}，機率為 {(count_20_29/total_count):.7f}")
print(f"30~39範圍內的數量: {count_30_39}，機率為 {(count_30_39/total_count):.7f}")
print(f"40~49範圍內的數量: {count_40_49}，機率為 {(count_40_49/total_count):.7f}")
print(f"50~59範圍內的數量: {count_50_59}，機率為 {(count_50_59/total_count):.7f}")
print(f"60~69範圍內的數量: {count_60_69}，機率為 {(count_60_69/total_count):.7f}")
print(f"70~79範圍內的數量: {count_70_79}，機率為 {(count_70_79/total_count):.7f}")
print(f"80~89範圍內的數量: {count_80_89}，機率為 {(count_80_89/total_count):.7f}")
print(f"90以上的數量: {count_above_90}，機率為 {(count_above_90/total_count):.7f}")
