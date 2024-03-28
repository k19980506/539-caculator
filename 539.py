import csv
from collections import defaultdict
import argparse

# 讀取CSV文件並將資料存儲在列表中
lottery_data = []
with open("539_data.csv", "r") as file:
    reader = csv.reader(file)
    tmp = 0
    for row in reader:
        # 初始化字典來計算每個號碼的出現次數
        date = row[1]
        numbers = [int(num) for num in row[2:]]
        if 5 in numbers and 12 in numbers:
            tmp += 1
        lottery_data.append((date, numbers))

number_counts = defaultdict(int)
print(f"總共 {len(lottery_data)} 期")

continuous_count = 0
continuous_numbers_count = 0
previous_numbers = set()

# 遍歷所有開獎結果，計算每一天與前一天開出任一相同號碼的天數，以及連續開出的號碼數量
for i in range(1, len(lottery_data)):
    _, current_numbers = lottery_data[i]
    _, previous_numbers = lottery_data[i - 1]

    # 檢查是否有相同號碼
    if any(number in previous_numbers for number in current_numbers):
        continuous_count += 1

    for number in previous_numbers:
        if number in current_numbers:
            continuous_numbers_count += 1

    # 更新前一天的號碼集合
    previous_numbers = set(current_numbers)

# print(f"與前一天開出任一相同號碼的天數：{continuous_count}")
# print(f"總共有 {continuous_numbers_count} 個號碼被連續開出")


# 遍歷所有開獎結果，計算每個號碼的出現次數
for _, numbers in lottery_data:
    for number in numbers:
        number_counts[number] += 1

total_count = len(lottery_data) * 5

# 打印每個號碼的出現次數
for number, count in sorted(
    number_counts.items(), key=lambda item: item[1], reverse=True
):
    print(f"號碼 {number} 出現了 {count} 次")

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

parser = argparse.ArgumentParser()
parser.add_argument("-n", type=int, default=None)
args = parser.parse_args()
target_number = args.n

if target_number:
    print(number_gaps[target_number])

    # 初始化計數器
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

    # 遍歷數據，對每個數字進行分類
    for number in number_gaps[target_number]:
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

    print(
        f"0~9範圍內的數量: {count_0_9}，機率為 {(count_0_9/len(number_gaps[target_number])):.3f}"
    )
    print(
        f"10~19範圍內的數量: {count_10_19}，機率為 {(count_10_19/len(number_gaps[target_number])):.3f}"
    )
    print(
        f"20~29範圍內的數量: {count_20_29}，機率為 {(count_20_29/len(number_gaps[target_number])):.3f}"
    )
    print(
        f"30~39範圍內的數量: {count_30_39}，機率為 {(count_30_39/len(number_gaps[target_number])):.3f}"
    )
    print(
        f"40~49範圍內的數量: {count_40_49}，機率為 {(count_40_49/len(number_gaps[target_number])):.3f}"
    )
    print(
        f"50~59範圍內的數量: {count_50_59}，機率為 {(count_50_59/len(number_gaps[target_number])):.3f}"
    )
    print(
        f"60~69範圍內的數量: {count_60_69}，機率為 {(count_60_69/len(number_gaps[target_number])):.3f}"
    )
    print(
        f"70~79範圍內的數量: {count_70_79}，機率為 {(count_70_79/len(number_gaps[target_number])):.3f}"
    )
    print(
        f"80~89範圍內的數量: {count_80_89}，機率為 {(count_80_89/len(number_gaps[target_number])):.3f}"
    )
    print(
        f"90以上的數量: {count_above_90}，機率為 {(count_above_90/len(number_gaps[target_number])):.3f}"
    )


# 打印每個號碼的最長間隔
for number in sorted(max_gaps.keys()):
    max_gap = max_gaps[number]
    # print(f"號碼 {number} 的最長間隔為 {max_gap}")

avg_gaps = {}
for number, gaps in number_gaps.items():
    avg_gap = sum(gaps) / len(gaps) if gaps else 0  # 避免除以0
    avg_gaps[number] = avg_gap

# 打印每個號碼的間隔平均值，按照號碼大小排列
for number in sorted(avg_gaps.keys()):
    avg_gap = avg_gaps[number]
    # print(f"號碼 {number} 的間隔平均值為 {avg_gap:.2f}")
