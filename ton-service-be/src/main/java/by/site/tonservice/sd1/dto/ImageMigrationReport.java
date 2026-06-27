package by.site.tonservice.sd1.dto;

import java.util.ArrayList;
import java.util.List;

public class ImageMigrationReport {

    private boolean dryRun;
    private int totalCandidates;
    private int converted;
    private int convertedDbOnly;
    private int wouldConvert;
    private int skipped;
    private int failed;
    private List<ImageMigrationEntryResult> entries = new ArrayList<>();

    public boolean isDryRun() {
        return dryRun;
    }

    public void setDryRun(boolean dryRun) {
        this.dryRun = dryRun;
    }

    public int getTotalCandidates() {
        return totalCandidates;
    }

    public void setTotalCandidates(int totalCandidates) {
        this.totalCandidates = totalCandidates;
    }

    public int getConverted() {
        return converted;
    }

    public void setConverted(int converted) {
        this.converted = converted;
    }

    public int getConvertedDbOnly() {
        return convertedDbOnly;
    }

    public void setConvertedDbOnly(int convertedDbOnly) {
        this.convertedDbOnly = convertedDbOnly;
    }

    public int getWouldConvert() {
        return wouldConvert;
    }

    public void setWouldConvert(int wouldConvert) {
        this.wouldConvert = wouldConvert;
    }

    public int getSkipped() {
        return skipped;
    }

    public void setSkipped(int skipped) {
        this.skipped = skipped;
    }

    public int getFailed() {
        return failed;
    }

    public void setFailed(int failed) {
        this.failed = failed;
    }

    public List<ImageMigrationEntryResult> getEntries() {
        return entries;
    }

    public void setEntries(List<ImageMigrationEntryResult> entries) {
        this.entries = entries;
    }
}
