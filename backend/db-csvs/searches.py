import requests
import csv

devices_to_ids = {}
line_count = 0
with open('./DeviceSearches.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        if line_count == 0:
            line_count += 1
        else:
            devices_to_ids[row[1]] = row[0]
            line_count += 1

all_cves = []
cve_set = set()
for each_device in devices_to_ids.keys():
    the_url = "https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch={}&keywordExactMatch".format(each_device)
    responses = requests.get(the_url).json()
    print(the_url)
    if responses["resultsPerPage"] > 0:
        for each_vul_json in responses['vulnerabilities']:
            if not each_vul_json['cve']['id'] in cve_set:
                cve_set.add(each_vul_json['cve']['id'])
                all_cves.append([each_vul_json['cve']['id'],devices_to_ids[each_device]])

with open("Vuls.csv", mode="wt") as csv_file:
    fieldnames = ['cveID', 'deviceID']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames, delimiter=",", quoting=csv.QUOTE_NONNUMERIC)
    writer.writeheader()
    for each_cve in all_cves:
        writer.writerow({fieldnames[0]:each_cve[0], fieldnames[1]:each_cve[1]})
