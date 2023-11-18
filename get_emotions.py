from transformers import  DataCollatorWithPadding, Trainer, TrainingArguments, BertTokenizer, BertConfig, BertForSequenceClassification, pipeline
from sklearn.metrics import accuracy_score, f1_score
import sys

def compute_metrics(pred):
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)
    f1 = f1_score(labels, preds, average = 'weighted')
    acc = accuracy_score(labels, preds)
    return {'accuracy': acc, 'f1': f1}

model_ckpt = 'bert-base-uncased'

label2id = {"sadness": 0,
            "joy": 1,
            "love": 2,
            "anger": 3,
            "fear": 4,
            "surprise": 5}

id2label = {"0": "sadness",
            "1": "joy",
            "2": "love",
            "3": "anger",
            "4": "fear",
            "5": "surprise"}

config = BertConfig.from_pretrained(model_ckpt,
                                    label2id = label2id,
                                    id2label = id2label)

tokenizer = BertTokenizer.from_pretrained(model_ckpt)

data_collator = DataCollatorWithPadding(tokenizer = tokenizer)

trained_model_name = "bhadresh-savani/bert-base-uncased-emotion"

pre_trained_model = BertForSequenceClassification.from_pretrained(trained_model_name, config=config)

training_args = TrainingArguments(
    output_dir='./emotions_predictions',
    per_device_eval_batch_size=64,
)

pre_trainer = Trainer(
    model=pre_trained_model,
    args=training_args,
    data_collator=data_collator,
    compute_metrics=compute_metrics,
)

classifier = pipeline("text-classification",model='bhadresh-savani/bert-base-uncased-emotion', top_k=None)

lyrics = sys.argv[1:]
predictions = []
for line in lyrics:
    prediction = classifier(line)
    predictions.append(prediction[0])

totals, average = [dict.fromkeys(label2id.keys(), 0)]*2
for prediction in predictions:
    for categorie in prediction:
        totals[categorie['label']] += categorie['score']

for k in totals.keys():
    average[k] = totals[k] / len(predictions)

print(average)
#print(classifier(' '.join(lyrics)))