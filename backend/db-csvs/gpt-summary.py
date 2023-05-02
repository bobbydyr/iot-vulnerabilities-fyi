import requests
import csv
import json

f = open('./api-keys.json')
keys = json.load(f)
GPT_URL = "https://api.openai.com/v1/chat/completions"
HEADERS = {"Content-Type": "application/json", "Authorization": "Bearer {}".format(keys["gpt-key"])}

all_cves = []
line_count = 0
with open('./Vuls.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        if line_count != 0:
            all_cves.append(row[0])
        line_count += 1

all_summaries = []
post_data = {"model": "gpt-3.5-turbo", "temperature": 0.7, "messages": [{"role": "user", "content": ''}]}
for each_cve in all_cves:
    try:
        cve_url = "https://services.nvd.nist.gov/rest/json/cves/2.0?cveId={}".format(each_cve)
        cve_response = responses = requests.get(cve_url).json()
        if responses["resultsPerPage"] > 0:
            the_cve_json = responses["vulnerabilities"][0]["cve"]
            the_prompt = "Summarize the descriptions and possible solutions of this cve within 200 - 220 words: {}".format(json.dumps(the_cve_json))
            post_data["messages"][0]["content"] = the_prompt
            summary_response = requests.post(GPT_URL, headers=HEADERS, json=post_data).json()
            if "choices" in summary_response:
                all_summaries.append([each_cve, summary_response["choices"][0]["message"]["content"]])
                if len(all_summaries) == 1:
                    print(all_summaries)
    except:
        print("an exception occured")

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
