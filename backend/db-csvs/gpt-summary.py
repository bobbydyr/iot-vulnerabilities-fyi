import requests
import csv

GPT_URL = "https://api.openai.com/v1/chat/completions"
HEADERS = {"Content-Type": "application/json", "Authorization": "Bearer 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"}

all_cves = []
line_count = 0
with open('./Vuls.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        if line_count != 0:
            # the_prompt = "https://nvd.nist.gov/vuln/detail/{}, summarize this vulnerability, including its description and solutions, in simple language within 180 - 200 words.".format(row[0])
            all_cves.append(row[0])
        line_count += 1

all_summaries = []
post_data = {"model": "gpt-3.5-turbo", "temperature": 0.7, "messages": [{"role": "user", "content": ''}]}
# summary_response = requests.post(GPT_URL, headers=HEADERS, json=post_data).json()
for each_cve in all_cves:
    the_prompt = "https://nvd.nist.gov/vuln/detail/{}, summarize this vulnerability, including its description and solutions, in simple language within 200 - 220 words.".format(each_cve)
    post_data["messages"][0]["content"] = each_cve
    summary_response = requests.post(GPT_URL, headers=HEADERS, json=post_data).json()
    all_summaries.append([each_cve, summary_response["choices"][0]["message"]["content"]])

cve_to_device = {}
line_count = 0
with open("Vuls.csv") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        if line_count != 0:
            cve_to_device[row[0]] = row[1]
        line_count += 1
with open("Summaries.csv", mode="wt") as csv_file:
    fieldnames = ['cveID', 'summary', 'deviceID']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames, delimiter="|", quoting=csv.QUOTE_NONNUMERIC, lineterminator="\r")
    writer.writeheader()
    for each_summary in all_summaries:
        writer.writerow({fieldnames[0]:each_summary[0], fieldnames[1]:each_summary[1], fieldnames[2]:cve_to_device[each_summary[0]]})
