import pandas as pd
from itertools import combinations

# 讀取CSV文件
data = pd.read_csv(
    "539_data.csv",
    header=None,
    names=["期號", "日期", "數字1", "數字2", "數字3", "數字4", "數字5"],
)

# 初始化字典來存儲每一對數字的計數
pair_counts = {}

# 遍歷數據，對每一對數字進行計數
for _, row in data.iterrows():
    numbers = row[2:]
    for pair in combinations(numbers, 2):
        pair_counts[pair] = pair_counts.get(pair, 0) + 1

# 計算每一對數字同時出現的機率
total_draws = len(data)
pair_probabilities = {pair: count / total_draws for pair, count in pair_counts.items()}

# 找出同時出現機率最高的兩個數字
most_common_pair = max(pair_probabilities, key=pair_probabilities.get)
probability = pair_probabilities[most_common_pair]

# 打印結果
print(f"最高同時出現機率的兩個數字為 {most_common_pair}，機率為 {probability:.2f}")

# 找出前20名同時出現機率最高的數字組合
top_20_pairs = sorted(pair_probabilities.items(), key=lambda x: x[1], reverse=True)[:20]

# 打印結果
print("前20名同時出現機率最高的數字組合：")
for pair, probability in top_20_pairs:
    print(
        f"數字組合 {pair}，同時出現次數為 {pair_counts[pair]} 機率為 {probability:.6f}"
    )


def find_most_common_combinations(data, group_size):
    # 初始化字典來存儲每一組數字的計數
    combination_counts = {}

    # 遍歷數據，對每一組數字進行計數
    for _, row in data.iterrows():
        numbers = row[2:]
        for combination in combinations(numbers, group_size):
            combination_counts[combination] = combination_counts.get(combination, 0) + 1

    # 找出最常出現的組合
    most_common_combination = max(combination_counts, key=combination_counts.get)
    count = combination_counts[most_common_combination]

    return most_common_combination, count


most_common_pair, pair_count = find_most_common_combinations(data, 2)
print(f"兩個個數字一組的最常出現組合為 {most_common_pair}，出現次數為 {pair_count}")

# 找出三個數字一組的組合最常出現
most_common_triple, triple_count = find_most_common_combinations(data, 3)
print(f"三個數字一組的最常出現組合為 {most_common_triple}，出現次數為 {triple_count}")

# 找出四個數字一組的組合最常出現
most_common_quadruple, quadruple_count = find_most_common_combinations(data, 4)
print(
    f"四個數字一組的最常出現組合為 {most_common_quadruple}，出現次數為 {quadruple_count}"
)

# 找出五個數字一組的組合最常出現
most_common_quintuple, quintuple_count = find_most_common_combinations(data, 5)
print(
    f"五個數字一組的最常出現組合為 {most_common_quintuple}，出現次數為 {quintuple_count}"
)
